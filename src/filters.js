import moment from "moment";

const filters = {
  formatDate(str) {
    return moment(str).format("YYYY.MM.DD");
  }
};
export default filters;
