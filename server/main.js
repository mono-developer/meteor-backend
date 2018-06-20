import { Meteor } from 'meteor/meteor';
import { Restaurants } from '../api/restaurants.js';

Meteor.startup(() => {
  Api = new Restivus({
    version: 'v1',
    useDefaultAuth: true,
    prettyJson: true
  });

  // Api.addCollection(Restaurants);

  Api.addRoute('restaurants', {authRequired: false}, {
    get: function () {
      const restaurants = Restaurants.find({}).fetch();
      
      if (restaurants) {
        return {status: "success", data: restaurants};
      }
      return {
        statusCode: 400,
        body: {
          status: "fail"
        }
      };
    },
    post: function () {
      const self = this;
      const restaurant = Restaurants.insert(self.bodyParams);

      if (restaurant) {
        return {status: "success", data: restaurant};
      }
      return {
        statusCode: 400,
        body: {
          status: "fail"
        }
      };
    }
  });

  Api.addRoute('restaurants/:id', {authRequired: false}, {
    put: function () {
      Restaurants.update(this.urlParams.id, {
        $set: this.bodyParams
      });
      return {
        status: "success"
      };
    },
    delete: function () {
      Restaurants.remove(this.urlParams.id);
      return {
        status: "success"
      };
    }
  });

});
