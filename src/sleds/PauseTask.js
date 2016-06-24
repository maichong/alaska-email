/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-23
 * @author Liang <liang@maichong.it>
 */

export default class PauseTask extends service.Sled {
  async exec(data) {
    let task = data.emailTask;

    if (task.state !== 1) {
      service.error('Error state');
    }

    task.state = 2;

    await task.save();

    return task.toObject();
  }
}
