import React, { useEffect } from 'react'
import classNames from 'classnames'

// import getParents from '../../../utilities/getParents';
import slideUp from '../../../utilities/slideUp';
import slideDown from '../../../utilities/slideDown';
import getParents from '../../../utilities/getParents';

import { NavLink, Link } from "react-router-dom";
import { getCookie } from '../../../services/cookieHandling';

function MenuHeading({ className, text, ...props }) {
    const compClass = classNames({
        'nk-menu-heading': true,
        [className]: className
    });
    return (
        <li className={compClass}>
            <h6 className="overline-title">{text || props.children}</h6>
        </li>
    )
}

function MenuItemTemplate({ text, icon }) {
    return (
        <>
            {icon && <span className="nk-menu-icon"><em className={`icon ni ni-${icon}`}></em></span>}
            {text && <span className="nk-menu-text">{text}</span>}
        </>
    )
}

function MenuItemLink({ text, icon, sub, to, blank, onClick }) {
    return (
        <>
            {(!blank && !sub) && <NavLink className="nk-menu-link" to={to}><MenuItemTemplate icon={icon} text={text} /></NavLink>}
            {blank && <Link className="nk-menu-link" to={to} target="_blank"><MenuItemTemplate icon={icon} text={text} /></Link>}
            {sub && <a className="nk-menu-link nk-menu-toggle" onClick={onClick} href="#expand"><MenuItemTemplate icon={icon} text={text} /></a>}
        </>
    )
}

function MenuItem({ sub, className, ...props }) {
    const compClass = classNames({
        'nk-menu-item': true,
        'has-sub': sub,
        [className]: className
    });
    return (
        <li className={compClass}>
            {props.children}
        </li>
    )
}

function MenuSub({ mega, className, ...props }) {
    const compClass = classNames({
        'nk-menu-sub': true,
        [className]: className
    });
    return (
        <ul className={compClass}>
            {props.children}
        </ul>
    )
}

function MenuList({ className, ...props }) {
    const compClass = classNames({
        'nk-menu': true,
        [className]: className
    });
    return (
        <ul className={compClass}>
            {props.children}
        </ul>
    )
}

function Menu() {

    // variables for Sidebar
    let menu = {
        classes: {
            main: 'nk-menu',
            item: 'nk-menu-item',
            link: 'nk-menu-link',
            toggle: 'nk-menu-toggle',
            sub: 'nk-menu-sub',
            subparent: 'has-sub',
            active: 'active',
            current: 'current-page'
        },
    };

    let currentLink = function (selector) {
        let elm = document.querySelectorAll(selector);
        elm.forEach(function (item) {
            var activeRouterLink = item.classList.contains('active');
            if (activeRouterLink) {
                let parents = getParents(item, `.${menu.classes.main}`, menu.classes.item);
                parents.forEach(parentElemets => {
                    parentElemets.classList.add(menu.classes.active, menu.classes.current);
                    let subItem = parentElemets.querySelector(`.${menu.classes.sub}`);
                    subItem !== null && (subItem.style.display = "block")
                })

            } else {
                item.parentElement.classList.remove(menu.classes.active, menu.classes.current);
            }
        })
    }


    // dropdown toggle
    let dropdownToggle = function (elm) {
        let parent = elm.parentElement;
        let nextelm = elm.nextElementSibling;
        let speed = nextelm.children.length > 5 ? 400 + nextelm.children.length * 10 : 400;
        if (!parent.classList.contains(menu.classes.active)) {
            parent.classList.add(menu.classes.active);
            slideDown(nextelm, speed);
        } else {
            parent.classList.remove(menu.classes.active);
            slideUp(nextelm, speed);
        }
    }

    // dropdown close siblings
    let closeSiblings = function (elm) {
        let parent = elm.parentElement;
        let siblings = parent.parentElement.children;
        Array.from(siblings).forEach(item => {
            if (item !== parent) {
                item.classList.remove(menu.classes.active);
                if (item.classList.contains(menu.classes.subparent)) {
                    let subitem = item.querySelectorAll(`.${menu.classes.sub}`);
                    subitem.forEach(child => {
                        child.parentElement.classList.remove(menu.classes.active);
                        slideUp(child, 400);
                    })
                }
            }
        });
    }

    let menuToggle = function (e) {
        e.preventDefault();
        let item = e.target.closest(`.${menu.classes.toggle}`)
        dropdownToggle(item);
        closeSiblings(item);
    }

    useEffect(() => {
        currentLink(`.${menu.classes.link}`);
        // eslint-disable-next-line
    }, [null])

    return (
        <MenuList>
            <MenuItem>
                <MenuItemLink icon="dashboard" text="Dashboard" to="/home" />
            </MenuItem>

            {getCookie("role") != "Staff" && <MenuHeading text={getCookie("role") == "Superadmin" ? "Users" : "Staff"} />}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="user-c" text="Hotel Owners" to="/owner-manage/owner-list" />
            </MenuItem>}
            {getCookie("role") != "Staff" && <MenuItem>
                <MenuItemLink icon="users" text={getCookie("role") == "Superadmin" ? "Customers" : "Staff"} to="/user-manage/user-list" />
            </MenuItem>}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="user-c" text="Sales representatives" to="/user-manage/sales-list" />
            </MenuItem>}
            {getCookie("role") != "Staff" && <MenuHeading text="Hotels" />}
            {getCookie("role") != "Staff" && <MenuItem sub>
                <MenuItemLink icon="building" text="Hotel Management" onClick={menuToggle} sub />
                <MenuSub>
                    <MenuItem>
                        <MenuItemLink text="All Hotels" to="/hotel-manage/hotels" />
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink text="Live hotels" to="/hotel-manage/live-hotels" />
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink text="Pending Hotels" to="/hotel-manage/pending-hotels" />
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink text="Suspended Hotels" to="/hotel-manage/suspended-hotels" />
                    </MenuItem>
                </MenuSub>
            </MenuItem>} 
          <MenuHeading text="Bookings" />
            <MenuItem>
                <MenuItemLink icon="calendar-booking" text="Bookings" to="/bookings/all-bookings" />
            </MenuItem>
            {getCookie("role") != "Staff" &&  <MenuHeading text="Other Facilities" />}
            {getCookie("role") != "Staff" && <MenuItem>
                <MenuItemLink icon="tags" text="Amenities" to="/amenities/all-amenities" />
            </MenuItem>}
            {getCookie("role") != "Staff" && <MenuItem>
                <MenuItemLink icon="building" text="Property Types" to="/propetyTypes/all-propertyTypes" />
            </MenuItem>}
            {getCookie("role") != "Staff" && <MenuItem>
                <MenuItemLink icon="cards" text="Services" to="/services/all-services" />
            </MenuItem>}
            


            {getCookie("role") == "Superadmin" && <MenuHeading text="Promotions" />}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="ticket" text="Coupons" to="/coupon/all-coupons" />
            </MenuItem>}
            {getCookie("role") == "Superadmin" && <MenuHeading text="Featured" />}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="list-round" text="Featured Hotels" to="/hotel-manage/featured-hotels" />
            </MenuItem>}
            {getCookie("role") == "Superadmin" && <MenuHeading text="Locations" />}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="location" text="Areas" to="/location/area/" />
            </MenuItem>}
            {getCookie("role") == "Superadmin" && <MenuItem>
                <MenuItemLink icon="building" text="Cities" to="/location/city/" />
            </MenuItem>}
        </MenuList>
    )
}

export default Menu