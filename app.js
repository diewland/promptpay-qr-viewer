var scanner = new Instascan.Scanner({
  video: document.getElementById('preview'),
  mirror: false, // for back camera
});
scanner.addListener('scan', function (content) {
  console.log(content);

  var obj = PPText2Obj.decode(content);
  if(obj){
    var s = [];
    if(obj['59']){
      s.push("Merchant Name : " + obj['59']);
    }
    if(obj['29_acc_no']){
      s.push("Account No : " + obj['29_acc_no']);
    }
    if(obj['29_acc_type']){
      s.push("Account Type : " + PPText2Obj.ACCOUNT_TYPE[obj['29_acc_type']]);
    }
    s.push("QR Type : " + PPText2Obj.QR_TYPE[obj['01']]);
    if(obj['30_biller_id']){
      s.push("Biller ID : " + obj['30_biller_id']);
    }
    if(obj['30_ref_1']){
      s.push("Ref 1 : " + obj['30_ref_1']);
    }
    if(obj['62_ref_3']){
      s.push("Ref 3 : " + obj['62_ref_3']);
    }
    if(obj['54']){
      s.push("Amount : " + obj['54']);
    }
    else {
      s.push("Amount : N/A");
    }
    // print all fields
    s.push('');
    s.push('##### DEBUG #####');
    s.push('');
    for(k in obj){
      s.push(k + ' : ' + obj[k]);
    }
    console.log(obj);
    alert(s.join("\n"));
  }
  else {
    alert(
      "Invalid format\n"
      + "\n"
      + content
    );
  }
});
Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    // last camera should be back camera ?
    scanner.start(cameras[cameras.length-1]);
  } else {
    console.error('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});
