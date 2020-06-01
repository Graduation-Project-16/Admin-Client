/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/AdminProfile.js";
import Maps from "views/examples/Maps.js";
import Users from "views/examples/Users.js";
import Icons from "views/examples/Icons.js";
import Livestreams from "views/examples/Livestreams.js";
import CatPro from "views/examples/CatPro";
import Order from "views/examples/Order";
import Login from "views/examples/Login"
import UserProfile from "views/examples/UserProfile";
import OrderDetail from "views/examples/OrderDetail";
import ProductReview from "views/examples/ProductReview";
import ViewLivestream from "views/examples/ViewLivestream";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/myprofile",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Users",
    icon: "ni ni-single-02 text-red",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/livestream",
    name: "Livestream",
    icon: "ni ni-key-25 text-info",
    component: Livestreams,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Product",
    icon: "ni ni-key-25 text-info",
    component: CatPro,
    layout: "/admin"
  },
  {
    path: "/order",
    name: "Order",
    icon: "ni ni-pin-3 text-orange",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "",
    icon: "ni ni-pin-3 text-orange",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/userprofile/:user_id",
    name: "",
    icon: "ni ni-pin-3 text-orange",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/orderdetail/:order_id",
    name: "",
    icon: "ni ni-pin-3 text-orange",
    component: OrderDetail,
    layout: "/admin"
  },
  {
    path: "/productreview/:product_id",
    name: "",
    icon: "ni ni-pin-3 text-orange",
    component: ProductReview,
    layout: "/admin"
  },
  {
    path: "/viewlivestream/:livestream_id",
    name: "",
    icon: "ni ni-pin-3 text-orange",
    component: ViewLivestream,
    layout: "/admin"
  },
  
];
export default routes;
