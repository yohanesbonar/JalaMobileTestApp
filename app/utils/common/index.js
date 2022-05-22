export const formatDate = date => {
  let temp = date.split(' ')[0].split('-').reverse(),
    newFormat;
  temp[0] = temp.splice(1, 1, temp[0])[0];
  let month = parseInt(temp[0]);
  month = convertMonth(month);
  newFormat = temp[1] + ' ' + month + ' ' + temp[2];
  if (newFormat.charAt(0) === '0') {
    newFormat = newFormat.slice(1);
  }
  return newFormat;
};

export const convertMonth = month => {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  return monthNames[month - 1];
};

export const uppercaseEachText = input => {
  input = input.toLowerCase();
  let arr = input.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  let result = arr.join(' ');
  return result;
};

export const getSize = (data, size) => {
  if (size == 20) {
    return data.size_20;
  } else if (size == 30) {
    return data.size_30;
  } else if (size == 40) {
    return data.size_40;
  } else if (size == 50) {
    return data.size_50;
  } else if (size == 60) {
    return data.size_70;
  } else if (size == 80) {
    return data.size_80;
  } else if (size == 90) {
    return data.size_90;
  } else if (size == 100) {
    return data.size_100;
  } else if (size == 110) {
    return data.size_110;
  } else if (size == 120) {
    return data.size_120;
  } else if (size == 130) {
    return data.size_130;
  } else if (size == 140) {
    return data.size_140;
  } else if (size == 150) {
    return data.size_150;
  } else if (size == 160) {
    return data.size_160;
  } else if (size == 170) {
    return data.size_170;
  } else if (size == 180) {
    return data.size_180;
  } else if (size == 190) {
    return data.size_190;
  } else if (size == 200) {
    return data.size_200;
  }
};

export const formatIDR = (fee, prefix) => {
  if (fee != null) {
    fee = fee.toString();
    var number_string = fee.replace(/[^,\d]/g, '').toString(),
      split = fee.split(','),
      residual = split[0].length % 3,
      rupiah = split[0].substr(0, residual),
      thousand = split[0].substr(residual).match(/\d{3}/gi);

    if (thousand) {
      separator = residual ? '.' : '';
      rupiah += separator + thousand.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? prefix + ' ' + rupiah : '';
  } else {
    return null;
  }
};

export const getMoney = (data, size, prefix) => {
  let tempfee = getSize(data, size);
  if (tempfee == null) {
    return null;
  } else {
    let result = formatIDR(tempfee, prefix);
    return result;
  }
};
