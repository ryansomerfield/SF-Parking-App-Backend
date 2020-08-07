const express = require("express");
const User = require("../models/User");
const { Car } = require("../models/Car");
const Street = require("../models/Street");
const router = express.Router();

//If no user, redirect to login
router.get("/*", (req, res, next) => {
  if (!req.user) {
    res.redirect(`${process.env.API_BASE}auth/`);
  } else {
    next();
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.CORS_ORIGIN}`);
});

router.get("/", (req, res) => {
  res.render("home");
});

//Users
router.get("/allusers", async (req, res) => {
  let data = await User.find({});
  res.json(data);
});

router.get("/user/me", async (req, res) => {
  let data = await User.find({
    _id: req.user._id,
  });
  res.json(data);
});

router.get("/user/:id", async (req, res) => {
  let data = await User.find({
    _id: req.params.id,
  });
  res.json(data);
});

//Streets
router.get("/allstreets", async (req, res) => {
  let data = await Street.find({});
  res.json(data);
});

router.get("/street/:id", async (req, res) => {
  let data = await Street.find({
    _id: req.params.id,
  });
  res.json(data);
});

router.post("/street", async (req, res, next) => {
  let newStreet = new Street(req.body);
  try {
    let street = await Street.findOne({
      streetName: newStreet.streetName,
      "polygon.coordinates": newStreet.polygon.coordinates,
    });
    if (street) {
      res.json(street);
    } else {
      street = await Street.create(newStreet);
      res.json(street);
    }
  } catch (err) {
    console.error(err);
  }
});

//Cars
router.get("/allcars", async (req, res) => {
  let data = await Car.find({});
  res.json(data);
});

router.get("/car/:id", async (req, res) => {
  let data = await Car.find({
    _id: req.params.id,
  });
  res.json(data);
});

router.post("/car", async (req, res, next) => {
  let newCar = new Car({ ...req.body, owner: req.user._id });
  try {
    let car = await Car.findOne({
      owner: req.user._id,
      nickname: newCar.nickname,
    });
    if (car) {
      res.json(car);
    } else {
      car = await Car.create(newCar);
      const owner = await User.findByIdAndUpdate(req.user._id, {
        cars: [...req.user.cars, car],
      });
      res.json(car);
    }
  } catch (err) {
    console.error(err);
  }
});

router.patch("/car/:id", async (req, res) => {
  try {
    const updatedOwner = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          updatedAt: Date.now(),
          cars: (() => {
            carsArray = [];
            req.user.cars.forEach((element) => {
              if (req.params.id == element._id) {
                carsArray.push({ ...element, ...req.body });
              } else {
                carsArray.push(element);
              }
            });
            return carsArray;
          })(),
        },
      },
      { new: true }
    );

    const updatedCar = await Car.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      { $set: { ...req.body, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(updatedCar);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/car/:id", async (req, res) => {
  try {
    const updatedOwner = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          updatedAt: Date.now(),
          cars: (() => {
            carsArray = [];
            req.user.cars.forEach((element) => {
              if (req.params.id != element._id) {
                carsArray.push(element);
              }
            });
            return carsArray;
          })(),
        },
      },
      { new: true }
    );

    const updatedCar = await Car.findOneAndRemove({
      _id: req.params.id,
      owner: req.user._id,
    });

    res.json(updatedCar);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
