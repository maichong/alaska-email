/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-23
 * @author Liang <liang@maichong.it>
 */

export default class RunTask extends service.Sled {
  async exec(data) {
    let task = data.emailTask;

    if (task.state !== 0) {
      service.error('Error state');
    }

    task.state = 1;

    await task.save();

    return task.toObject();
  }
}
