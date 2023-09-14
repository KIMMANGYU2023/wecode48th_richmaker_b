const request = require("supertest");

const { createApp } = require("../../app");
const { AppDataSource } = require("../../api/models/dataSourceMyData");

describe("mydata", () => {
  let app;

  // const phoneNumber = {
  //   phoneNumber : 01047130841
  // }

  // const naverUser = {
  //   phoneNumber : 01047130842
  // }

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    // await UserFixture.createUsers([kakaoUser, naverUser])
  });

  afterAll(async () => {
    /*
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await AppDataSource.query(`TRUNCATE authDB.identities_test`);
    await AppDataSource.query(
      `ALTER TABLE authDB.identities AUTO_INCREMENT = 1`
    );
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await AppDataSource.destroy();
    */
  });

  // 다음과 같이 본인이 작성한 코드에 맞춰 다양한 케이스를 모두 테스트해야 합니다.
  // 그래야 의도에 맞게 코드가 잘 작성되었는지 테스트 단계에서부터 확인할 수 있습니다!
  test("SUCCESS: getAccountsByCI", async () => {
    const response = await request(app)
      .get("/mydata/account")
      .send({
        CI: "23RW7AUQVFGX7VW6N4XHQH6VPFR2I5JVRMLA4Q4T9ZAVXQJTC9NJ75H7GC3JNPVEBI",
        providerIDs: [4, 6],
      });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(200);
  });

  test("FAILED: no records", async () => {
    await request(app)
      .get("/mydata/account")
      .send({
        CI: "23RW7AUQVFGX7VW6N4XHQH6VPFR2I5JVRMLA4Q4T9ZAVXQJTC9NJ75H7GC3JNPVEBI",
        providerIDs: [1, 2, 3],
      })
      .expect(400)
      .expect({ message: "NO_RECORDS" });
  });

  test("SUCCESS: getHistoriesByCI", async () => {
    const response = await request(app).get("/mydata").send({
      CI: "23RW7AUQVFGX7VW6N4XHQH6VPFR2I5JVRMLA4Q4T9ZAVXQJTC9NJ75H7GC3JNPVEBI",
      providerID: 4,
      financeNumber: "004-4747-4466-44",
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(200);
  });

  test("FAILED: no records", async () => {
    await request(app)
      .get("/mydata")
      .send({
        CI: "23RW7AUQVFGX7VW6N4XHQH6VPFR2I5JVRMLA4Q4T9ZAVXQJTC9NJ75H7GC3JNPVEBI",
        providerID: 3,
        financeNumber: "004-4747-4466-44",
      })
      .expect(400)
      .expect({ message: "NO_RECORDS" });
  });
});
