var axios = require('axios');
let firebaseApiKey = process.env.FIREBASE_Firebase_Api_Key;

class MemberModel {
  constructor(data) {
    this.data = data;
  }

  async getMember(uid) {
    let data = await db.collection("MEMBER").doc(uid).get();
    return data.data();
  }

  async update(uid, updateData) {
    try {
      // 執行更新操作
      await db.collection("MEMBER").doc(uid).set({
        ...updateData,
        updateAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
  
      // 獲取更新後的會員資料
      const updatedMemberData = await this.getMember(uid);
      return updatedMemberData;

    } catch (error) {
      // 處理可能的錯誤
      console.error("Error updating member:", error);
      throw error; // 或返回錯誤訊息
    }
  };

  async updatePassword(uid, newPassword) {
    try {
      await admin.auth().updateUser(uid, {
        password: newPassword
      });
    } catch (err) {
      return { err: err.errorInfo.code };
    }
    return db.collection("MEMBER").doc(uid).set({
      password: null,
      currentPassword: null,
      updateAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  };

  async deleteMember(uid) {
    try {
      await admin.auth().deleteUser(uid);
    } catch (err) {
      return { err: err.errorInfo.code };
    }
    return db.collection("MEMBER").doc(uid).delete();
  }

  async sendVerifyEmail(idToken) {
    return axios({
      method: "post",
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + firebaseApiKey,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        requestType: "VERIFY_EMAIL",
        idToken
      }
    });
  };

  async loginMember(email, password) {
    return axios({
      method: "post",
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseApiKey,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: email,
        password: password,
        returnSecureToken: true
      }
    });
  };

  async forgetEmail(email) {
    return axios({
      method: "post",
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + firebaseApiKey,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        requestType: "PASSWORD_RESET",
        email
      }
    });
  };

  // async add(newData) {
  //   let data = this.data || newData;
  //   let uid = "";
  //   //新增用戶 https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
  //   try {
  //     let userRecord = await admin.auth().createUser({
  //       email: data.email,
  //       phoneNumber: data.phoneNumber,
  //       password: data.password,
  //       displayName: data.displayName,
  //       photoURL: data.photoURL,
  //       role: data.role
  //     });
  //     uid = userRecord.uid; //回傳 uid
  //   } catch (err) {
  //     return { err: err.errorInfo.code }; //回傳 code (https://firebase.google.com/docs/auth/admin/errors)
  //   }
  //   if (!uid) return { err: "新增失敗" };

  //   // delete data.password //密碼刪掉
  //   return db.collection("MEMBER").doc(uid).set({
  //     ...MemberModel.prototype.member,
  //     ...data,
  //     createdAt: admin.firestore.FieldValue.serverTimestamp(),
  //     uid,
  //     password: null
  //   });
  // };

  async add(addData) {
    let userRecord = await admin.auth().createUser({
      email: addData.email,
      password: addData.password,
      displayName: addData.displayName,
      role: addData.role
    });
    let uid = userRecord.uid; //回傳 uid

    // 結合原型中的預設值和 POST 請求提供的數據
    let combinedData = {
      ...MemberModel.member, // 預設值
      ...addData // 從 POST 請求中獲取的數據
    };

    // 刪除不應該存儲在數據庫中的數據，比如 password
    delete combinedData.password;

    // 將組合後的數據寫入 Firestore
    return db.collection("MEMBER").doc(uid).set({
      ...combinedData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      uid
    });
  }

  static get member() {
    return {
      "uid": "",         // 會員 uid
      "email": "",       // 會員 email
      "role": "",        // 會員角色
      "displayName": "", // 會員姓名
      "photoURL": "",    // 會員照片
      "emailNotification": false, // email 是否驗證
      "phoneNumber": "", // 會員電話
      "photographyDetails": { // 攝影師詳細資料 (role === "photographer" 時才會有，否則為 預設值)
        "intro": "", // 簡介
        "region": "", // 地區
        "photographyTypes": [], // 攝影類型
        "additional": "", // 附加信息
        "socialLinks": {
          "behance": "",   // behance link
          "instagram": "", // instagram link
          "facebook": "",  // facebook link
          "youtube": ""    // youtube link
        },
        "backgroundImgUrl": "", // 背景圖片 URL
        "fee": 0, // 費用
        "regionFees": [], // 地區特定費用
        "portfolio": [], // 作品集
        "favoritesCount": 0, // 收藏數
        "avgRating": 0, // 平均評分
        "customerReviews": [] // 客戶評價
      },
      "updateAt": "", // 更新時間
      "createdAt": "" // 建立時間
    };
  }
}

// MemberModel.prototype = {
//   member: {
//     "uid": "",         // 會員 uid
//     "email": "",       // 會員 email
//     "role": "",        // 會員角色
//     "displayName": "", // 會員姓名
//     "photoURL": "",    // 會員照片
//     "emailNotification": false, // email 是否驗證
//     "phoneNumber": "", // 會員電話
//     "photographyDetails": { // 攝影師詳細資料 (role === "photographer" 時才會有，否則為 預設值)
//       "profile": {
//         "intro": "", // 簡介
//         "region": "", // 地區
//         "photographyTypes": [], // 攝影類型
//         "additional": "", // 附加信息
//         "socialLinks": {
//           "behance": "",   // behance link
//           "instagram": "", // instagram link
//           "facebook": "",  // facebook link
//           "youtube": ""    // youtube link
//         },
//         "backgroundImgUrl": "", // 背景圖片 URL
//         "fee": 0, // 費用
//         "regionFees": [], // 地區特定費用
//         "portfolio": [], // 作品集
//         "favoritesCount": 0, // 收藏數
//         "avgRating": 0, // 平均評分
//         "customerReviews": [] // 客戶評價
//       }
//     },
//     "updateAt": "", // 更新時間
//     "createdAt": "" // 建立時間
//   }
// }

module.exports = new MemberModel();