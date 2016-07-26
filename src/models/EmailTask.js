/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-23
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import service from '../';
import User from 'alaska-user/models/User';

export default class EmailTask extends alaska.Model {

  static label = 'Email Task';
  static icon = 'paper-plane';
  static title = 'title';
  static defaultColumns = 'title email state progress total createdAt';
  static defaultSort = '-sort';

  static actions = {
    run: {
      title: 'Run',
      style: 'success',
      sled: 'RunTask',
      depends: {
        state: 0
      }
    },
    resume: {
      title: 'Resume',
      style: 'success',
      sled: 'ResumeTask',
      depends: {
        state: 2
      }
    },
    pause: {
      title: 'Pause',
      style: 'warning',
      sled: 'PauseTask',
      depends: {
        state: 1
      }
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    email: {
      label: 'Email',
      ref: 'Email',
      required: true
    },
    state: {
      label: 'State',
      type: 'select',
      number: true,
      default: 0,
      options: [{
        label: 'Ready',
        value: 0
      }, {
        label: 'Running',
        value: 1
      }, {
        label: 'Pause',
        value: 2
      }, {
        label: 'Complete',
        value: 3
      }]
    },
    interval: {
      label: 'Interval',
      type: Number,
      default: 1,
      addonAfter: 'Seconds'
    },
    filters: {
      label: 'Filters',
      type: Object,
      default: {}
    },
    progress: {
      label: 'Progress',
      type: Number,
      default: 0
    },
    total: {
      label: 'Total',
      type: Number
    },
    lastUser: {
      label: 'Last User',
      ref: User
    },
    nextAt: {
      label: 'Next At',
      type: Date
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };

  async preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    if (!this.state && !this.nextAt) {
      this.nextAt = new Date;
    }
    if (!this.total && !this.state) {
      this.total = await User.where(this.filters || {}).where('email').ne(null).count();
    }
  }

  postSave() {
    service.updateTasks();
  }

  postRemove() {
    service.updateTasks();
  }
}
