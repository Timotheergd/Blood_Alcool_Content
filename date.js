Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

//   Date.prototype.add = function(date) {
//     return new Date().setTime(this.getTime() + date.getTime());
//   }

function addDates(date1, date2) {
    var d = new Date()
    d.setTime(date1.getTime() + date2.getTime());
    return d;
}

function substractDates(date1, date2) {
    var d = new Date()
    d.setTime(Math.max(date1.getTime() - date2.getTime(), 0));
    return d;
}

Date.prototype.greaterThan = function(date) {
    return this.getTime()>date.getTime();
  }

Date.prototype.toHours = function(date) {
return this.getTime()/(60*60*1000);
}
  
function parseDHMS(day, hour, minute, seconds) {
    return new Date(1000*(seconds+60*(minute+60*(hour+24*(day)))));
}