var navMain = document.querySelector('.nav-main');
navMain.classList.remove('nav-main--no-js');
var toggleButton = navMain.querySelector('.nav-main__toggle');

toggleButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  navMain.classList.toggle('nav-main--show');
});

var modal = document.querySelector('.modal-buy-product');

if (modal) {
  var addLinks = document.querySelectorAll('.products-list__buy');
  var buyLink = document.querySelector('.main-product__buy');
  var modalClose = modal.querySelector('.modal-buy-product__close');
  var modalSumbit = modal.querySelector('.modal-buy-product__sumbit');

  for (addLink of addLinks) {
    addLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      modal.classList.add('modal-buy-product--show');
    });
  }

  buyLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal-buy-product--show');
  });

  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal-buy-product--show');
  });

  modalSumbit.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal-buy-product--show');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (modal.classList.contains('modal-buy-product--show')) {
        evt.preventDefault();
        modal.classList.remove('modal-buy-product--show');
      }
    }
  });
}
