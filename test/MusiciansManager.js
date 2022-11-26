const MusiciansManager = artifacts.require("./MusiciansManager");

contract("MusiciansManager", (accounts) => {
  it("Doit ajouter un musicien", async function () {
    const Contract = await MusiciansManager.deployed();
    const result = await Contract.addMusician(
      "0x6dd728dd3f384b39af380e82e6005805962c5de4",
      "Karim",
      { from: accounts[0] }
    );
    assert.equal(
      result.logs[0].args._artistName,
      "Karim",
      "Not equal to Karim"
    );
  });

  it("Ne doit pas ajouter de musiciens s'il existe déjà", async function () {
    const Contract = await MusiciansManager.deployed();
    let err = null;
    try {
      await Contract.addMusician(
        "0x6dd728dd3f384b39af380e82e6005805962c5de4",
        "Karim2",
        { from: accounts[0] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  });

  it("Doit ajouter un track", async function () {
    const Contract = await MusiciansManager.deployed();

    const result = await Contract.addTrack(
      "0x6dd728dd3f384b39af380e82e6005805962c5de4",
      "TrackTitle",
      400,
      { from: accounts[0] }
    );
    assert.equal(
      result.logs[0].args._title,
      "TrackTitle",
      "Not equal to TrackTitle"
    );
  });

  it("Ne doit pas ajouter de track si elle existe déjà", async function () {
    const Contract = await MusiciansManager.deployed();
    let err = null;
    try {
      await Contract.addTrack(
        "0x950a11753934810552f9a3fa22c14fbd7138ae90",
        "TrackTitle22",
        400,
        { from: accounts[0] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  });

  it("devrait obtenir les liste des tracks d'un artiste", async function () {
    const Contract = await MusiciansManager.deployed();
    const result = await Contract.getTracks(
      "0x6dd728dd3f384b39af380e82e6005805962c5de4",
      { from: accounts[0] }
    );
    assert.ok(Array.isArray(result.logs[0].args._tracks));
  });
});
