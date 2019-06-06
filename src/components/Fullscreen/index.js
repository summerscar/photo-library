import Fullscreen from './index.vue';

const FullscreenBox = {}
// vue的install方法，用于定义vue插件
FullscreenBox.install = function (Vue) {
  const MessageBoxInstance = Vue.extend(Fullscreen);
  let instance;
  const initInstance = () => {
    // 实例化vue实例
    instance = new MessageBoxInstance();
    let msgBoxEl = instance.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$FullscreenBox = {
    show (photo) {
      if (!instance) {
        initInstance();
      }
      instance.show(photo)
    },
    close() {
      instance.close()
    }
  };
};
export default FullscreenBox