import { Button, Card, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, } from '../../components';
import { useEffect, useState } from 'react';
import { getCookie } from '../../services/cookieHandling';
import { toast } from 'react-toastify';

import { Dropdown } from "react-bootstrap";

import { CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem, Rating } from "../../components";


function ProductPage() {
  const location = useLocation();
  const [hotels, setHotels] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);
  const handleShowModal = () => setdeleteModal(true);
  const handleCloseModal = () => setdeleteModal(false);
  const [roomId, setRoomId] = useState(null)
  const getAllHotel = async () => {
    const { data, status } = await axios.get(("Hotel/list" + (getCookie("role") == "Hotel" ? `?author_id=${getCookie("author_id")}` : '') + (location.pathname.includes("featured-hotels") ? '?is_featured=true' : '')));
    if (status === 200 || status === 201) {
      setHotels(data?.results)
    }
  }
  const deleteUser = async () => {
    const { data, status } = await axios.delete(`Hotel/delete/${roomId}`)
    if (status == 204) {
      toast.success(`Hotel deleted successfully`)
      getAllHotel();
      setdeleteModal(false)
    }
  }
  useEffect(() => {
    getAllHotel();
  }, [])

  const allColumns = [
    {
      name: "Title",
      grow: 3,
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.real_address,
      cell: (row) => (
        <span>{row.real_address}</span>
      ),
      
    },
    {
      name: "price",
      selector: (row) => row.price,
      cell: (row) => (
        <span className="small">{row.price}</span>
      ),
      sortable: true,
    },
    {
      name: "rating",
      selector: (row) => row.rating_standard,
      cell: (row) => (
        <Rating rating={row.rating_standard} />
      ),
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      cell: (row) => (
        <span className={`badge text-bg-${row.status === "Live" ? "success-soft"
          : row.status === "Pending" ? "info-soft"
            : row.status === "Suspended" ? "danger-soft"
              : "secondary-soft"}`
        }>
          {row.status ? row.status : 'General'}
        </span>
      ),
      sortable: true,
    },
    {
      name: "action",
      cell: (row) => (
        <div className="text-end w-100">
          <Dropdown>
            <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
              <Icon name="more-v"></Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
              <div className="dropdown-content py-1">
                <LinkList className="link-list-hover-bg-primary link-list-md">
                  <LinkListItem to={`/hotel-manage/add-hotel/${row._id}`}>
                    <Icon name="edit"></Icon><span>Edit</span>
                  </LinkListItem>
                  <li>
                    <Button className="btn-custom" onClick={() => { setRoomId(row._id); handleShowModal() }}>
                      <Icon name="trash"></Icon><span>Delete</span>
                    </Button>
                  </li>
                </LinkList>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      sortable: false,
      
    },

  ]
  return (
    <Layout title="Hotels" content="container">
      <Block.Head>
        <Block.HeadBetween>
          <Block.HeadContent>
            <Block.Title tag="h2">{location.pathname.includes("featured-hotels") ? "Featured" : "All"}  Hotels</Block.Title>
            <nav>
              <ol className="breadcrumb breadcrumb-arrow mb-0">
                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                <li className="breadcrumb-item">Hotels</li>
                <li className="breadcrumb-item active" aria-current="page">All Hotels</li>
              </ol>
            </nav>
          </Block.HeadContent>
          <Block.HeadContent>
            <ul className="d-flex">
              <li>
                <Link to="/hotel-manage/add-hotel" className="btn btn-primary btn-md d-md-none">
                  <Icon name="plus" />
                  <span>Add</span>
                </Link>
              </li>
              {getCookie("role") == "Superadmin" && <li>
                <Link to="/hotel-manage/add-hotel" className="btn btn-primary d-none d-md-inline-flex">
                  <Icon name="plus" />
                  <span>Add Hotel</span>
                </Link>
              </li>}
            </ul>
          </Block.HeadContent>
        </Block.HeadBetween>
      </Block.Head>
      <Block>
        <Card>
          {hotels && <DataTable tableClassName="data-table-head-light table-responsive data-table-checkbox" data={hotels} columns={allColumns} selectableRows ></DataTable>}
        </Card>
      </Block>
      <Modal show={deleteModal} onHide={handleCloseModal}>
        <div className="modal-content">
          <div className="modal-body p-5 text-center">
            <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
            <h3>Are You Sure ?</h3>
            <p className="small">This hotel will be removed permanently.</p>
            <ul className="d-flex gap g-3 justify-content-center pt-1">
              <li><Button variant="success" onClick={() => { deleteUser() }}>Yes Delete it!</Button></li>
              <li><Button variant="danger" className="btn-soft" onClick={handleCloseModal}>Cancel</Button></li>
            </ul>
          </div>
          <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={handleCloseModal} aria-label="Close"></button>
        </div>
      </Modal>
    </Layout>
  )
}

export default ProductPage;