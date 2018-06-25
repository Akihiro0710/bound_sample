const Bound = {};
Bound.Field = function (e) {
  this.init(e);
};

Bound.Field.prototype = {
  canvas: null,
  context: null,
  size: {
    width: 0,
    height: 0
  },
  components: [],
  constructor: Bound.Field,
  init: function (e) {
    this.canvas = e;
    if (this.canvas.getContext) {
      this.context = this.canvas.getContext('2d');
      this.context.globalCompositeOperation = "source-over";
      setInterval(() => this.draw(), 33);
    }
  },
  clear: function () {
    let context = this.context;
    if (!context) return;
    let size = this.size || {};
    context.fillStyle = "#000";
    context.fillRect(0, 0, size.width, size.height);
  },
  resize: function (parent) {
    this.size.width = this.canvas.width = parent.clientWidth;
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  add: function (component) {
    this.components.push(component);
  },
  draw: function () {
    this.clear();
    this.components.forEach(component => {
      component.move(this.size);
      component.draw(this.context);
    });
  }
};

Bound.Component = function (props) {
  this.init(props);
};

Bound.Component.defaults = {
  location: {
    x: 200,
    y: 150
  },
  speed: {
    x: 6.0,
    y: 6.0
  },
  color: '#3399FF',
  size: 4
};

Bound.Component.prototype = {
  constructor: Bound.Component,
  init: function (props) {
    this.props = Object.assign({}, JSON.parse(JSON.stringify(Bound.Component.defaults)), props || {});
  },
  move: function (size) {
    let props = this.props;
    let location = props.location;
    let speed = props.speed;
    location.x += speed.x;
    location.y += speed.y;
    if (location.x < 0 || location.x > size.width) {
      speed.x *= -1;
    }
    if (location.y < 0 || location.y > size.height) {
      speed.y *= -1;
      if (location.y < 0) location.y = 0;
      if (location.y > size.height) location.y = size.height;
    }
    if (location.x < 0) location.x = 0;
    if (location.x > size.width) location.x = size.width;
    if (location.y < 0) location.y = 0;
    if (location.y > size.height) location.y = size.height;
  },
  draw: function (context) {
    let props = this.props;
    let location = props.location;
    context.beginPath();
    context.fillStyle = props.color;
    context.arc(location.x, location.y, props.size, 0, Math.PI * 2.0);
    context.fill();
  }
};
