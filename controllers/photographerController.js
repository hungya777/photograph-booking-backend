const e = require("express");
const photographerModel = require("../models/photographerModel");

exports.getAllPhotographers = async (req, res, next) => {
  try {
    let result = await photographerModel.getAllPhotographers();
    res.send({
      status: "success",
      data: result
    })
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.toString()
    })
  }
}

exports.getPhotographer = async (req, res, next) => {
  try {
    let uid = req.params.uid;
    let result = await photographerModel.getPhotographer(uid);
    res.send({
      status: "success",
      data: result
    })
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.toString()
    })
  }
}

exports.updatePhotographer = async (req, res, next) => {
  try {
    let uid = req.params.uid;
    let updateData = req.body;
    let result = await photographerModel.updateDetail(uid, updateData);
    res.send({
      status: "success",
      data: result
    })
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.toString()
    })
  }
}