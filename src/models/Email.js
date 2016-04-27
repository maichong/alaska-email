/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-27
 * @author Liang <liang@maichong.it>
 */

export default class Email extends service.Model {

  static label = 'Email';
  static title = 'title';
  static defaultColumns = '_id title subject';
  static defaultSort = '-sort';
  static searchFields = 'title subject content';

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
    content: {
      label: 'Content',
      type: 'html'
    }
  };
}
