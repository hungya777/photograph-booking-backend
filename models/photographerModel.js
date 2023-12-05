class PhotographerModel {
  constructor(data) {
    this.data = data;
  }

  async getAllPhotographers() {
    let data = await db.collection("MEMBER").where("role", "==", "photographer").get();
    let result = [];
    data.forEach((doc) => {
      console.log('doc:', doc.data());
      // 自己組成要回傳的資料格式
      result.push({
        uid: doc.data().uid,
        displayName: doc.data().displayName,
        role: doc.data().role,
        photoURL: doc.data().photoURL,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
        photographyDetails: doc.data().photographyDetails
      })
    })

    return result;
  }

  async getPhotographer(uid) {
    let data = await db.collection("MEMBER").doc(uid).get();
    return {
      uid: data.data().uid,
      displayName: data.data().displayName,
      role: data.data().role,
      photoURL: data.data().photoURL,
      email: data.data().email,
      phoneNumber: data.data().phoneNumber,
      photographyDetails: data.data().photographyDetails
    }
  }

  async updateDetail(uid, updateData) {
    try {
      // 1. 先取得原本的資料
      let originalData = await db.collection("MEMBER").doc(uid).get();
      let originalPhotographyDetails = originalData.data().photographyDetails;

      // 2. 合併資料
      let combinedData = {
        ...originalPhotographyDetails,
        ...updateData
      }

      // 3. 執行更新操作
      await db.collection("MEMBER").doc(uid).set({
        ...originalData.data(),
        photographyDetails: combinedData,
        updateAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // 4. 獲取更新後的攝影師資料
      const updatedMemberData = await this.getPhotographer(uid);
      return updatedMemberData;
    } catch (error) {
      console.error("Error updating member:", error);
      throw error; // 或返回錯誤訊息
    }
  }
}

module.exports = new PhotographerModel();