/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-15
 * @author Liang <liang@maichong.it>
 */

import Email from '../models/Email';

export default class Send extends service.Sled {
  /**
   * 发送邮件
   * @param data
   *        data.email 邮件模板ID或记录
   *        data.to 目标邮件地址或用户
   *        [data.locale] 邮件采用的语言
   *        [data.driver] 驱动,如果不指定,则采用data.email记录中指定的驱动或默认驱动
   *        [data.values] Email内容中填充的数据
   *        [data.options] 其他发送选项
   */
  async exec(data) {
    let driver = data.driver;
    let to = data.to;
    if (driver && typeof driver === 'string') {
      driver = service.driversMap[driver];
    }
    let email = data.email;
    if (email && typeof email === 'string') {
      email = await Email.findCache(email);
    }
    if (!email) alaska.panic('Can not find email');

    if (!driver) {
      if (email && email.driver) {
        driver = service.driversMap[email.driver];
      }
      if (!driver) {
        driver = service.defaultDriver;
      }
    }

    if (to && typeof to === 'object' || !Array.isArray(to) && to.email) {
      if (to.displayName) {
        to = `${to.displayName}<${to.email}>`;
      } else {
        to = to.email;
      }
    }

    let engine = service.engine;

    let content = engine.render(email.content, { locals: data.values });

    return await driver.send(Object.assign({
      to,
      subject: email.subject,
      html: content
    }, data.options));
  }
}
