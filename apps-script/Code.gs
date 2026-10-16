/**
 * Google Apps Script — nhận RSVP & lời chúc, ghi vào Google Sheet.
 * Hướng dẫn cài đặt: xem README.md (mục "Kết nối Google Sheet").
 */

// Phải trùng với GOOGLE_SCRIPT_SECRET trong Vercel / .env.local
var SECRET = 'doi-thanh-chuoi-bi-mat-cua-ban';

var HEADERS = {
  RSVP: ['Thời gian', 'Họ tên', 'Khách của', 'Xác nhận', 'Số người', 'Ghi chú'],
  Wishes: ['Thời gian', 'Tên', 'Lời chúc']
};

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS[name].length).setFontWeight('bold').setBackground('#F3E5AB');
  }
  return sh;
}

// Chặn công thức độc hại (=, +, -, @ ở đầu ô)
function safe_(v) {
  v = String(v == null ? '' : v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });
    var d = body.data || {};
    var now = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    if (body.sheet === 'RSVP') {
      sheet_('RSVP').appendRow([now, safe_(d.name), safe_(d.side), safe_(d.attending), Number(d.guests) || 0, safe_(d.note)]);
    } else if (body.sheet === 'Wishes') {
      sheet_('Wishes').appendRow([now, safe_(d.name), safe_(d.message)]);
    } else {
      lock.releaseLock();
      return json_({ ok: false, error: 'bad sheet' });
    }
    lock.releaseLock();
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Trả về 50 lời chúc mới nhất (chỉ tên + lời chúc, không lộ dữ liệu RSVP)
function doGet(e) {
  if (!e.parameter || e.parameter.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });
  if (e.parameter.action !== 'wishes') return json_({ ok: false, error: 'bad action' });
  var sh = sheet_('Wishes');
  var last = sh.getLastRow();
  if (last < 2) return json_({ ok: true, wishes: [] });
  var from = Math.max(2, last - 49);
  var rows = sh.getRange(from, 1, last - from + 1, 3).getDisplayValues();
  var wishes = rows.reverse().map(function (r) {
    return { createdAt: r[0], name: r[1], message: r[2] };
  });
  return json_({ ok: true, wishes: wishes });
}
