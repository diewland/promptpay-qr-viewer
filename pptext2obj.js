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
