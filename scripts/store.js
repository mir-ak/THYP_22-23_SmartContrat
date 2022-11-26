const MusiciansManager = artifacts.require("MusiciansManager");

module.exports = async (callback) => {
  try {
    const MusiciansManager = await MusiciansManager.deployed();
    const reciept = await MusiciansManager.SendRequest("Hello World");
    console.log(reciept);
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
