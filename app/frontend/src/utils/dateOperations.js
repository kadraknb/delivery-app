import moment from 'moment';

export default class DateOperations {
  static formatDDMMYYYY(date) {
    return moment(date).format('DD/MM/YYYY');
  }
}
