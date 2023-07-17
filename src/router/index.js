import React from 'react'
import { Routes, Route } from "react-router-dom";

import { ScrollToTop } from '../components';

//Pages
import Blank from '../pages/Blank';
import HomeEcommerce from '../pages/HomeEcommerce';


// owner manage
import OwnerList from '../pages/owner-manage/OwnerList';
import OwnerProfile from '../pages/owner-manage/OwnerProfile';
import OwnerEdit from '../pages/owner-manage/OwnerEdit';


// user manage
import UserList from '../pages/user-manage/UserList';
import UserCards from '../pages/user-manage/UserCards';
import UserProfile from '../pages/user-manage/UserProfile';
import UserEdit from '../pages/user-manage/UserEdit';

// admin
import Profile from '../pages/admin/Profile';
import ProfileSettings from '../pages/admin/ProfileSettings';

// hotel manage
import Hotels from '../pages/hotel-manage/Hotels';
import LiveHotel from '../pages/hotel-manage/LiveHotels';
import PendingHotel from '../pages/hotel-manage/PendingHotels';
import SuspendedHotels from '../pages/hotel-manage/SuspendedHotels';
import AddHotel from '../pages/hotel-manage/AddHotel';
import EditHotel from '../pages/hotel-manage/EditHotel';
import RoomList from '../pages/hotel-manage/RoomList';


// auths pages
import AuthRegister from '../pages/auths/AuthRegister';
import AuthLogin from '../pages/auths/AuthLogin';
import AuthReset from '../pages/auths/AuthReset';

import NotFound from '../pages/error/NotFound';
import AddCoupon from '../pages/coupons/AddCoupon';
import CouponList from '../pages/coupons/CouponList';
import AddAmenity from '../pages/amenities/AddAmenity';
import AmenityList from '../pages/amenities/AmenityList';
import AddRoom from '../pages/hotel-manage/AddRoom';
import RoomAvailability from '../pages/hotel-manage/RoomAvailability';
import BookingsList from '../pages/booking/BookingsList';
import AddBooking from '../pages/booking/AddBooking';
import Area from '../pages/locations/Area';
import FeaturedHotels from '../pages/featured/FeaturedHotels';
import AddArea from '../pages/locations/AddArea';
import AddCity from '../pages/locations/AddCity';
import City from '../pages/locations/City';
import SalesListPage from '../pages/user-manage/SalesList';
import AddPropertyType from '../pages/amenities/AddPropertyType';
import PropertyTypesList from '../pages/amenities/PropertyTypes';
import AddServices from '../pages/amenities/AddServices';
import ServicesList from '../pages/amenities/ServicesList';
import AddSales from '../pages/user-manage/SalesEdit';

function Router() {
  return (
    <ScrollToTop>
      <Routes>
          <Route path="blank" element={<Blank />} />
          <Route path="/" element={<AuthLogin />} />
          <Route path="/home" element={<HomeEcommerce />} />

          <Route path="owner-manage">
            <Route path="owner-list" element={<OwnerList />} />
            <Route path="owner-profile/:id" element={<OwnerProfile />} />
            <Route path="owner-edit/:id" element={<OwnerEdit />} />
            <Route path="owner-edit" element={<OwnerEdit />} />
          </Route>
          <Route path="user-manage">
            <Route path="user-list" element={<UserList />} />
            <Route path="sales-list" element={<SalesListPage />} />
            <Route path="sales-add" element={<AddSales />} />
            <Route path="sales-add/:id" element={<AddSales />} />
            <Route path="user-cards" element={<UserCards />} />
            <Route path="user-profile/:id" element={<UserProfile />} />
            <Route path="user-edit/:id" element={<UserEdit />} />
            <Route path="user-edit" element={<UserEdit />} />
          </Route>

          <Route path="admin">
            <Route path="profile" element={<Profile />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
          </Route>
          <Route path="bookings">
            <Route path="all-bookings" element={<BookingsList />} />
            <Route path="add-booking" element={<AddBooking />} />
          </Route>
          <Route path="coupon">
            <Route path="all-coupons" element={<CouponList />} />
            <Route path="add-coupon" element={<AddCoupon />} />
            <Route path="add-coupon/:id" element={<AddCoupon />} />
          </Route>
          <Route path="amenities">
            <Route path="add-amenity" element={<AddAmenity />} />
            <Route path="add-amenity/:id" element={<AddAmenity />} />
            <Route path="all-amenities" element={<AmenityList />} />
          </Route>
          <Route path="propetyTypes">
            <Route path="add-propertyType" element={<AddPropertyType />} />
            <Route path="add-propertyType/:id" element={<AddPropertyType />} />
            <Route path="all-propertyTypes" element={<PropertyTypesList />} />
          </Route>
          <Route path="services">
            <Route path="add-services" element={<AddServices />} />
            <Route path="add-services/:id" element={<AddServices />} />
            <Route path="all-services" element={<ServicesList />} />
          </Route>
          <Route path="hotel-manage">
            <Route path="hotels" element={<Hotels />} />
            <Route path="live-hotels" element={<LiveHotel />} />
            <Route path="pending-hotels" element={<PendingHotel />} />
            <Route path="suspended-hotels" element={<SuspendedHotels />} />
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="add-hotel/:id" element={<AddHotel />} />
            <Route path="rooms-list/:id" element={<RoomList />} />
            <Route path="rooms-availability/:id" element={<RoomAvailability />} />
            <Route path="add-room/:id" element={<AddRoom />} />
            <Route path="add-room/:id/:roomId" element={<AddRoom />} />
            <Route path="edit-hotel/:id" element={<EditHotel />} />
            <Route path="featured-hotels" element={<Hotels />} />
          </Route>
          <Route path="location">
            <Route path="area" element={<Area />} />
            <Route path="add-area" element={<AddArea />} />
            <Route path="add-city" element={<AddCity/>} />
            <Route path="city" element={<City />} />
          </Route>

          <Route path="auths">
            <Route path="auth-register" element={<AuthRegister />} />
            <Route path="auth-login" element={<AuthLogin />} />
            <Route path="auth-reset" element={<AuthReset />} />
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollToTop>
    
  )
}

export default Router;
