const express = require('express');
const router = express.Router();
const memberController = require("../controllers/memberController");
const auth = require("../middleware/auth"); //驗證

// 會員註冊
router.post('/register',
    /* 	#swagger.tags = ['Member']
      #swagger.description = '會員註冊' */ 
        /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '輸入會員資料',
        required: true,
        schema: {
          "email": "andy@test.com",
          "password": "test1234",
          "displayName": "Andy",
          "role": "photographer"
        }
    } */

    /* #swagger.responses[200] = { 
    schema: {
      "success": true,
      "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoibWFtYSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9waG90b2dyYXBoZXItYm9va2luZy10ZXN0IiwiYXVkIjoicGhvdG9ncmFwaGVyLWJvb2tpbmctdGVzdCIsImF1dGhfdGltZSI6MTcwMTYxNzM5MCwidXNlcl9pZCI6InBxMjVrZnMxZVpQMWRBTmdIajlYakNJNWliTjIiLCJzdWIiOiJwcTI1a2ZzMWVaUDFkQU5nSGo5WGpDSTVpYk4yIiwiaWF0IjoxNzAxNjE3MzkwLCJleHAiOjE3MDE2MjA5OTAsImVtYWlsIjoibWFtYUB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYW1hQHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.HrC-z5TsOVWvQSc9FtpFnfrb4f0n3Bl6a6MINhJ4pV5esi5fDLcpA33eWF1-wc5rK0yHm0xy4QQ-I0iBEi7QXbx9JOYWq69QvwUpnov-DzIofAl4hA1WDOXcDs7fHmwjLQi1uWTjgPXLJWwPZeiuT8QlacJZ3CqlWsJ9_pK2rDUPNJHcCn-7e-oPOgnNQzHKyM2lzXIpqPCJGEbumxgwJ0ykV0mby_R1l40zLI4A0vmgkjvirPfFXUrjJIWelJ8GPTJbjoBoGwFNX2JaoeDJ1q3hMvr78WElgrR9Im9Tu1NgIB6lekeWlDcg-FPJ6wPpP02txUtJN4dmNgpaLf52fA",
      "refreshToken": "AMf-vBxkLakPs4RY_jYh2sdEK5NFWcu5mFDENZu60J--aIuqy86z7FM3xSMy1bBQft3ffxQ3HsnVoUjVe3vof5E7uNFtZ8QwjSQ0MKTNFRhctN8BlA5tYBxGf4wN53YEg9wKr71Pp3bvvdYvFa8yI0V2hjq9_d_Dr-1x-2WFE7zFO3fBNulVxWqtAEm7TU5n1q1jwFiITwcnVViBojqiHF0LLazVb6NjIpbc1cu4ZEH-uQ8jU6QZsCk"
    }} */
    memberController.register
  );

// 會員登入
router.post('/login',
    /* 	#swagger.tags = ['Member']
    #swagger.description = '會員登入' */

    /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '會員資料',
        required: true,
        schema: {
          "email": "andy@test.com",
          "phoneNumber": "test1234",
        }
    } */

    /* #swagger.responses[200] = { 
    schema: {
      "status": "success",
      "data": {
          "uid": "nkgFQg8NcsUVI4ZN1XiNS2kHbx93",
          "role": "photographer",
          "email": "andy@test.com",
          "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5keTExIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Bob3RvZ3JhcGhlci1ib29raW5nLXRlc3QiLCJhdWQiOiJwaG90b2dyYXBoZXItYm9va2luZy10ZXN0IiwiYXV0aF90aW1lIjoxNzAxNjIwMTI2LCJ1c2VyX2lkIjoibmtnRlFnOE5jc1VWSTRaTjFYaU5TMmtIYng5MyIsInN1YiI6Im5rZ0ZRZzhOY3NVVkk0Wk4xWGlOUzJrSGJ4OTMiLCJpYXQiOjE3MDE2MjAxMjYsImV4cCI6MTcwMTYyMzcyNiwiZW1haWwiOiJhbmR5QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFuZHlAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.iZ_EqlDArlbl6KFxBNyfxIKwAYuHrsuxHpT7TaRcS9oEF_md4fsY50U7kcCvqhcfRdM3oIuAPnWkpJbd6jb5iFsqMaQ6Q3x3DFzKsijxzwfz2hJq_D9lCQtunnS8ZzIcD-U6i72-_s4TdY9ITDwOGFNboUPzWkkWDac2TDtO1pJT11F7Ixan-C9jF9mJAwB-CZxQC1HNZYv8uscTtdywp_a_9dOOyQSMuWvsxD5Rh-nmT289tHw5B184nLMOxqxHluBT4ji_bRIHWTplMBFvj5WGC3h6VfyqjxCeTzJw1N-nC7lh6lDRmUCItF9buKDuO9BBFTSujYqOn7yuGweKMw",
          "refreshToken": "AMf-vBzcPWTWT_uKDzCuGRCXASLxtK6LtZR6EQpP9eIhsYNUj8vGGW7iweW5iGQKsUwU5KjspH2sHfYY_ew602znHVuBjigz6o3mrL6Zqep30PMzDVfnfu-0RAIN2fwCkG_Z7anAiUmhw0FJOSemxMiieRk_eSXLSXWKgAJUUFGvEdL_Jce85GKgNliW4yaSSd1oNKg5YNK-tObNgoWz8iobzAcraMBEQdszMwA0a9YrxOucgUA2Hsg"
      }
    }} */
    memberController.login
  );

// 取得會員個人資訊
router.get("/getMember", 
    /* 	#swagger.tags = ['Member']
      #swagger.description = '取得會員個人資訊' */
    /* #swagger.responses[200] = { 
    schema: {
      "status": "success",
      "data": {
        "uid": "nkgFQg8NcsUVI4ZN1XiNS2kHbx93",
        "photoURL": "https://www.ysnp.gov.tw/FileDownload/ContentManagement/20200917192037311936059.jpg",
        "role": "photographer",
        "displayName": "Andy22",
        "email": "Andy@test.com"
      }
    }} */

    /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
    auth, 
    memberController.getMember
  );

// 更新會員資料
router.put("/:uid",
    /* 	#swagger.tags = ['Member']
      #swagger.description = '更新會員資料' */

    /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '會員資料',
        required: true,
        schema: {
          "displayName": "Andy",
          "phoneNumber": "091234567",
          "photoURL": "https://www.ysnp.gov.tw/FileDownload/ContentManagement/20200917192037311936059.jpg"
        }
    } */

    /* #swagger.responses[200] = { 
    schema: {
      "status": "success",
      "data": {
          "uid": "nkgFQg8NcsUVI4ZN1XiNS2kHbx93",
          "displayName": "Andy",
          "email": "Andy@test.com",
          "role": "photographer",
          "phoneNumber": "091234567",
          "photoURL": "https://www.ysnp.gov.tw/FileDownload/ContentManagement/20200917192037311936059.jpg"
      }
    }} */

    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    auth, 
    memberController.updateMember
  );

// 變更密碼
router.post("/updatePassword/:uid",
    /* 	#swagger.tags = ['Member']
      #swagger.description = '變更密碼' */

    /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '請輸入密碼資料',
        required: true,
        schema: {
          "email": "allen@test.com",
          "currentPassword": "test5678",
          "newPassword": "test6789"
        }
    } */

    /* #swagger.responses[200] = { 
    schema: {
      "status": "success",
      "message": "密碼更新成功"
    }} */

    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    auth, 
    memberController.updatePassword
  );

// 忘記密碼寄發Ｅmail
router.post('/forgetEmail',
    /* 	#swagger.tags = ['Member']
      #swagger.description = '忘記密碼寄發Ｅmail' */

    /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '請輸入 Email',
        required: true,
        schema: {
          "email": "andy@test.com",
        }
    } */

    /* #swagger.responses[200] = { 
    schema: {
      "success": true
    }} */
    memberController.forgetEmail
  );

// 刪除會員
router.delete("/:uid", 
    /* 	#swagger.tags = ['Member']
      #swagger.description = '刪除會員' */

    /* #swagger.responses[200] = { 
    schema: {
      "status": "success",
      "message": "刪除成功"
    }} */

    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    auth, 
    memberController.deleteMember
  );

module.exports = router;
