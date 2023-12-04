// Description: 會員相關的邏輯

const memberModel = require("../models/memberModel");

exports.register = async (req, res, next) => {
  let data = req.body;
  //TODO後端驗證欄位
  if (1 == -1) return res.status(400).send({
      status: "error",
      message: "欄位驗證出錯" 
    })

  try {
    let result = await memberModel.add(data);
    if (result.err) { //代表有錯
      return res.status(500).send({ 
        status: "error", 
        message: result.err 
      })
    }
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.toString() 
    })
  }

  try {
    let result = await memberModel.loginMember(data.email, data.password);//執行登入
    await memberModel.sendVerifyEmail(result.data.idToken); //寄送會員認證信
    res.send({
      success: true,
      idToken: result.data.idToken,
      refreshToken: result.data.refreshToken,
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.toString() 
    })
  }
}

exports.login = async (req, res, next) => {
  let data = req.body;
  try {
    let result = await memberModel.loginMember(data.email, data.password);
    let member = await memberModel.getMember(result.data.localId);
    res.send({
      status : "success",
      data: {
        uid: result.data.localId,
        role: member.role,
        email: result.data.email,
        idToken: result.data.idToken,
        refreshToken: result.data.refreshToken,
      }
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}

exports.getMember = async (req, res, next) => {
  let uid = req.query.uid;
  try {
    let result = await memberModel.getMember(uid);
    res.send({
      status : "success",
      data: {
        "uid": result.uid,
        "photoURL": result.photoURL,
        "role": result.role,
        "displayName": result.displayName,
        "email": result.email,
      }
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}

exports.updatePassword = async (req, res, next) => {
  let uid = req.params.uid;
  let data = req.body;
  // 檢查當前密碼是否為現在會員的密碼
  try {
    await memberModel.loginMember(data.email, data.currentPassword);
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }

  // 更新密碼
  try {
    await memberModel.updatePassword(uid, data.newPassword);
    res.send({ 
      status: "success",
      message: "密碼更新成功"
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}

exports.forgetEmail = async (req, res, next) => {
  let email = req.body.email;
  try {
    await memberModel.forgetEmail(email); //寄送忘記密碼認證信
    res.send({ success: true })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}

exports.updateMember = async (req, res, next) => {
  let uid = req.params.uid;
  let data = req.body;
  try {
    let result = await memberModel.update(uid, data);
    res.send({  
      status: "success",
      data: {
        "uid": result.uid,
        "displayName": result.displayName,
        "email": result.email,
        "role": result.role,
        "phoneNumber": result.phoneNumber,
        "photoURL": result.photoURL
      }
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}

exports.deleteMember = async (req, res, next) => {
  let uid = req.params.uid;
  try {
    await memberModel.deleteMember(uid);
    res.send({ 
      status: "success",
      message: "刪除成功" 
    })
  } catch (err) {
    return res.status(500).send({
      status: "error", 
      message: err.response.data.error 
    })
  }
}
