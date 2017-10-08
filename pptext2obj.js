function extract_pp_text(pp_text){
  var patt = "^00020101021229370016A000000677010111(.+)5303764(.*)5802TH.+$";
  var type_map = {
    '01': 'Telephone Number',
    '02': 'Thai ID Card',
    '03': 'e-Wallet ID',
  };

  var data = pp_text.match(patt);
  if((data !== null)&&(data.length == 3)){
    // extract account-id
    // tel-no       011300668xyyyzzzz
    // card-id      0213xxxxxxxxxxxxx
    // e-wallet-id  0315xxxxxxxxxxxxxxx
    var acc_id   = data[1];
    var acc_type = acc_id.substr(0, 2);
    var acc_val  = acc_id.substr(4);
    if(acc_type == '01'){
      acc_val = '0'+ acc_val.substr(4);
    }

    // extract amount
    var amount = null;
    if(data[2]){
      amount = data[2];
      if(amount.substr(0, 2) == '54'){
        amount  = amount.substr(4);
      }
    }

    // build return object
    return {
      type:       acc_type,
      type_label: type_map[acc_type],
      acc_id:     acc_val,
      amount:     amount,
    }
  }
  return null;
}

//            01 23 45 67 89 01 23 45 6789012345678901234567890123456789012 34 56 789 01 23 456789 01 23 45 67 89 0123
// var txt = "00-02-01|01-02-12|29-37-0016A00000067701011101130066840304251|53-03-764|54-06-123.45|58-02-TH|63-04-48DD";
// var txt = "00020101021129370016A0000006770101110113006683626369631460016A000000677010113010303002151000000000003565204581453037645802TH5913CREPE SOMWANG6007BANGKOK6105102406212070804000031630449EE";
function decode_pp_text(pp_text){

  var pp_obj = {};

  var field_no   = '';
  var field_size = '';

  for(var i=0; i<pp_text.length; i++){
    var c = pp_text[i];
    // console.log(i, c);

    // get field no
    if(field_no.length < 2){
      field_no += c;
    }
    // get field size
    else if(field_size.length < 2){
      field_size += c;
    }
    // get field value
    else {
      field_size = parseInt(field_size);
      pp_obj[field_no] = pp_text.substr(i, field_size);

      console.log(i, field_no, field_size, pp_obj[field_no]);

      // prepare for next field
      field_no   = '';
      field_size = '';
      i += field_size-1;
    }
  }

  return pp_obj;
}
