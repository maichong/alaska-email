/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-22
 * @author Liang <liang@maichong.it>
 */

export default class Test extends service.Sled {
  async exec(data) {
    let email = data.email;
    await service.run('Send', {
      email,
      to: data.body.testTo,
      values: data.body.testData
    });
    return email.toObject();
  }
}
