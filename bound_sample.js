let field;
(function () {
  window.onload = function () {
    let canvas = document.getElementById('canvas');
    field = new Bound.Field(canvas);
    let outputArea = document.getElementById('output-area');
    let resize = function () {
      field.resize(outputArea);
    };
    resize();
    field.add(new Bound.Component());
    window.addEventListener('resize', resize);
    let inputs = {
      locationX: document.getElementById("location-x"),
      locationY: document.getElementById("location-y"),
      speedX: document.getElementById("speed-x"),
      speedY: document.getElementById("speed-y"),
      color: document.getElementById("color"),
      size: document.getElementById("size")
    };
    let setValue = function (props) {
      inputs.locationX.value = props.location.x;
      inputs.locationY.value = props.location.y;
      inputs.speedX.value = props.speed.x;
      inputs.speedY.value = props.speed.y;
      inputs.color.value = props.color;
      inputs.size.value = props.size;
    };
    let getValue = function () {
      return {
        location: {
          x: parseInt(inputs.locationX.value),
          y: parseInt(inputs.locationY.value)
        },
        speed: {
          x: parseInt(inputs.speedX.value),
          y: parseInt(inputs.speedY.value)
        },
        color: inputs.color.value,
        size: parseInt(inputs.size.value)
      };
    };
    let addComponent = function (props) {
      field.add(new Bound.Component(props));
    };
    setValue(Bound.Component.defaults);
    document.getElementById("add-button").addEventListener('click', function () {
      addComponent(getValue());
    });
    canvas.addEventListener('click',function (ev) {
      inputs.locationX.value = ev.clientX;
      inputs.locationY.value = ev.clientY;
      addComponent(getValue());
    })
  };
})();
