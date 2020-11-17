const x = (function () {
  // const search_date = document.getElementById('xfrom');

  // search_date.style.color = 'red';
  let today = new Date();
  let currDate = today.toISOString().slice(0, 10);
  var search_date = flatpickr('#xfrom', {
    dateFormat: 'd.m.Y',
    defaultDate: today,
  });

  // search_date.value = currDate;
  // search_date.dateFormat = 'd/m/Y';

  const searchForm = document.getElementById('search_form');
  const searchButton = document.getElementById('search_button');

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    let selectedDate = searchForm.elements['xfrom'].value;
    console.log(selectedDate);

    let sd = selectedDate.split('.');
    let YMD_Date = sd[2] + '-' + sd[1] + '-' + sd[0];
    console.log(YMD_Date);

    // Afisez lista de programari din data selectata
    return YMD_Date;
  };

  searchForm.addEventListener('submit', handleSearchFormSubmit);

  function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ')';
      op += op * 0.1;
    }, 10);
  }

  function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ')';
      op -= op * 0.1;
    }, 50);
  }

  let message_ele = document.getElementsByClassName('message');

  for (let i = 0; i < message_ele.length; i++) {
    setTimeout(function () {
      fade(message_ele[i]);
    }, 2000);
  }

  let start_time = document.getElementById('start_time');
  let end_time = document.getElementById('end_time');

  if (end_time) {
    end_time.addEventListener('click', () => {
      end_time.value = start_time.value;
      let end_hour = parseInt(end_time.value.split(':')[0]);
      let end_minutes = parseInt(end_time.value.split(':')[1]);

      console.log(end_minutes);
      end_minutes = parseInt(end_minutes / 15 + 1) * 15;
      console.log(end_minutes);
      if (end_minutes > 45) {
        end_minutes = 0;
        end_hour++;
        if (end_hour === 24) {
          end_hour = 0;
        }
      }

      if (end_hour < 10) {
        end_hour = '0' + end_hour;
      }

      if (end_minutes < 10) {
        end_minutes = '0' + end_minutes;
      }

      end_time.value = end_hour + ':' + end_minutes;
    });
  }

  function sortSelect(elem) {
    var tmpAry = [];
    // Retain selected value before sorting
    if (elem.selectedIndex >= 0) {
      var selectedValue = elem[elem.selectedIndex].value;
    }

    // Grab all existing entries
    for (var i = 0; i < elem.options.length; i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
    tmpAry.sort(function (a, b) {
      return a.text < b.text ? -1 : 1;
    });
    // Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    var newSelectedIndex = 0;
    for (var i = 0; i < tmpAry.length; i++) {
      elem.options[i] = tmpAry[i];
      if (selectedValue > 0) {
        if (elem.options[i].value == selectedValue) newSelectedIndex = i;
      }
    }
    elem.selectedIndex = newSelectedIndex; // Set new selected index after sorting
    return;
  }

  let selectElements = document.getElementsByTagName('select');

  if (selectElements.length > 0) {
    for (let sel of selectElements) {
      sortSelect(sel);
    }
  }
})();
