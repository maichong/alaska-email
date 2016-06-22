/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-27
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import _ from 'lodash';

export default class EmailService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = options.id || 'alaska-email';
    options.dir = options.dir || __dirname;
    super(options, alaska);
  }

  preLoadModels() {
    let drivers = this.config('drivers');
    if (!drivers || !Object.keys(drivers).length) {
      throw new Error('No email driver found');
    }
    let driversOptions = [];
    let defaultDriver;
    let driversMap = {};
    _.forEach(drivers, (driver, key) => {
      let label = driver.label || key;
      driver.key = key;
      driversOptions.push({ label, value: key });
      if (driver.send) {
        //已经实例化的driver
      } else if (driver.type) {
        let Driver = require(driver.type).default;
        driver = new Driver(this, driver);
      } else {
        throw new Error('invalid email driver config ' + key);
      }
      driversMap[key] = driver;
      driver.key = key;
      if (!defaultDriver || driver.default) {
        defaultDriver = driver;
      }
    });
    this.driversOptions = driversOptions;
    this.defaultDriver = defaultDriver;
    this.driversMap = driversMap;
  }
}
