const express = require('express');
const router = express.Router();
const photographerController = require("../controllers/photographerController");
const auth = require("../middleware/auth"); //驗證

// 取得全部攝影師
router.get("/all",
  /* 	#swagger.tags = ['PhotoGrapher']
    #swagger.description = '取得全部攝影師' */
  /* #swagger.responses[200] = { 
  schema: {
    "status": "success",
    "data": [
      {
        "uid": "ABQAULEsOne1NS4nd75UKSRpSAJ2",
        "displayName": "Andy",
        "role": "photographer",
        "photoURL": "",
        "email": "andy@test.com",
        "phoneNumber": "",
        "photographyDetails": {
          "customerReviews": [],
          "socialLinks": {
            "youtube": "",
            "behance": "",
            "facebook": "",
            "instagram": ""
          },
          "photographyTypes": [],
          "regionFees": [],
          "portfolio": [],
          "intro": "",
          "additional": "",
          "fee": 0,
          "avgRating": 0,
          "region": "",
          "favoritesCount": 0,
          "backgroundImgUrl": ""
        }
      }
    ]
  }} */
  photographerController.getAllPhotographers
);

// 取得單一攝影師
router.get("/details/:uid",
  /* 	#swagger.tags = ['PhotoGrapher']
    #swagger.description = '取得全部攝影師' */
  /* #swagger.responses[200] = { 
  schema: {
    "status": "success",
    "data": [
      {
        "uid": "ABQAULEsOne1NS4nd75UKSRpSAJ2",
        "displayName": "Andy",
        "role": "photographer",
        "photoURL": "",
        "email": "andy@test.com",
        "phoneNumber": "",
        "photographyDetails": {
          "customerReviews": [],
          "socialLinks": {
            "youtube": "",
            "behance": "",
            "facebook": "",
            "instagram": ""
          },
          "photographyTypes": [],
          "regionFees": [],
          "portfolio": [],
          "intro": "",
          "additional": "",
          "fee": 0,
          "avgRating": 0,
          "region": "",
          "favoritesCount": 0,
          "backgroundImgUrl": ""
        }
      }
    ]
  }} */
  photographerController.getPhotographer
);

// 更新單一攝影師個人簡歷
router.put("/details/:uid",
  /* 	#swagger.tags = ['PhotoGrapher']
    #swagger.description = '更新單一攝影師個人簡歷' */

  /*	#swagger.parameters['obj'] = {
      in: 'body',
      description: '攝影師個人履歷資料',
      required: true,
      schema: {
        "customerReviews": [
          {
            "clientName": "Amy",
            "review": "非常專業的攝影師，照片質感很好！",
            "rating": 5
          }
        ],
        "socialLinks": {
          "behance": "behance.net/yourprofile",
          "instagram": "instagram.com/yourprofile",
          "facebook": "facebook.com/yourprofile",
          "youtube": "youtube.com/yourchannel"
        },
        "photographyTypes": ["商業攝影", "婚禮攝影"],
        "regionFees": [
          {
            "region": "台北市",
            "fee": 3500
          },
          {
            "region": "新北市",
            "fee": 3000
          }
        ],
        "portfolio": [
          "https://firestore/photo1",
          "https://firestore/photo2",
          "https://firestore/photo3"
        ],
        "intro": "攝影愛好者",
        "additional": "相機設備：Nikon D850, Canon EOS 5D Mark IV",
        "fee": 3000,
        "avgRating": 4.9,
        "region": "新北市",
        "favoritesCount": 77,
        "backgroundImgUrl": "http://example.com/images/background.jpg"
      }
  } */

  /* #swagger.responses[200] = { 
  schema: {
    "status": "success",
    "data": {
      "uid": "oLUL1P3gHjVzlbFkrwDf4Rd8zcu2",
      "displayName": "Amy",
      "role": "photographer",
      "photoURL": "",
      "email": "amy@test.com",
      "phoneNumber": "",
      "photographyDetails": {
        "customerReviews": [
          {
            "clientName": "Amy",
            "review": "非常專業的攝影師，照片質感很好！",
            "rating": 5
          }
        ],
        "socialLinks": {
          "youtube": "youtube.com/yourchannel",
          "behance": "behance.net/yourprofile",
          "facebook": "facebook.com/yourprofile",
          "instagram": "instagram.com/yourprofile"
        },
        "photographyTypes": [
          "商業攝影",
          "婚禮攝影"
        ],
        "portfolio": [
          "https://firestore/photo1",
          "https://firestore/photo2",
          "https://firestore/photo3"
        ],
        "regionFees": [
          {
            "fee": 3500,
            "region": "台北市"
          },
          {
            "fee": 3000,
            "region": "新北市"
          }
        ],
        "additional": "相機設備：Nikon D850, Canon EOS 5D Mark IV",
        "fee": 3000,
        "intro": "攝影愛好者",
        "avgRating": 4.9,
        "favoritesCount": 77,
        "region": "新北市",
        "backgroundImgUrl": "http://example.com/images/background.jpg"
      }
    }
  }} */

  /* #swagger.security = [{
    "apiKeyAuth": []
  }] */
  auth,
  photographerController.updatePhotographer
);

module.exports = router;
