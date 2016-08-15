/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-27
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import service from '../';

export default class Email extends alaska.Model {

  static label = 'Email';
  static icon = 'envelope';
  static title = 'title';
  static defaultColumns = '_id title subject';
  static defaultSort = '-sort';
  static searchFields = 'title subject content';

  static actions = {
    test: {
      title: 'Test Send',
      sled: 'Test',
      style: 'success',
      depends: 'testTo'
    }
  };

  static fields = {
    _id: {
      type: String,
      required: true
    },
    title: {
      label: 'Title',
      type: String,
      require: true
    },
    subject: {
      label: 'Subject',
      type: String
    },
    driver: {
      label: 'Driver',
      type: 'select'
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    testTo: {
      label: 'Test Send To',
      type: String,
      private: true
    },
    testData: {
      label: 'Test Template Variables',
      type: Object,
      private: true,
      default: {}
    },
    content: {
      label: 'Content',
      type: 'html'
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
