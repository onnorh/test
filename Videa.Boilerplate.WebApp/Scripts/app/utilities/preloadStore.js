/**
  We can insert data into the PreloadStore when the document is loaded.
  The data can be accessed once by a key, after which it is removed

  @class PreloadStore
**/
PreloadStore = {
    data: {},

    /**
      Store an object in the store
  
      @method store
      @param {String} key the key to store the object with
      @param {String} value the object we're inserting into the store
    **/
    store: function (key, value) {
        this.data[key] = value;
    },

    /**
      If we are sure it's preloaded, we don't have to supply a finder.
      Just returns undefined if it's not in the store.
  
      @method get
      @param {String} key the key to look up the object with
      @returns {Object} the object from the store
    **/
    'get': function (key) {
        return this.data[key];
    },

    getAndRemove: function (key) {
        var value = this.data[key];
        if (value) {
            delete this.data[key];
            return value;
        }

        return null;
    },

    /**
      Removes the stored value if the key exists
  
      @method remove
      @param {String} key the key to remove
    **/
    remove: function (key) {
        if (this.data[key]) delete this.data[key];
    }
};