import { Row, Col, Card, Button, Dropdown, Table, Badge } from 'react-bootstrap';

import Layout from '../layout/default';
import {
  Image,
  Icon,
  Media,
  MediaGroup,
  MediaText,
  Pureknob,
  CustomDropdownMenu,
  CustomDropdownToggle,
  OverlineTitle,
  ChartLegend
} from '../components';
import { ChartBar, ChartLine } from "../components/Chart/Charts"
import { Colors } from '../utilities/index';
import hexRGB from '../utilities/hexRGB';
import { useEffect, useState } from 'react';
import axios from '../services/axios';


// visitor chart data
let visitorsChartData = {
  labels: ["M", "T", "W", "T", "F", "S", "S"],
  yAxis: false,
  xGridColor: Colors.white,
  xGridBorderColor: Colors.white,
  datasets: [
    {
      label: "Visitors",
      borderColor: 'transparent',
      backgroundColor: hexRGB(Colors.info, .3),
      hoverBackgroundColor: Colors.info,
      borderWidth: 1,
      borderRadius: 10,
      borderSkipped: false,
      data: [600, 680, 470, 770, 570, 810, 670]
    }
  ]
};

// activity Chart
let activityChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  xAxis: false,
  yAxis: false,
  datasets: [
    {
      tension: .4,
      label: "Activity",
      borderColor: Colors.success,
      pointBackgroundColor: Colors.success,
      backgroundColor: hexRGB(Colors.success, 0.2),
      borderWidth: 2,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: Colors.success,
      fill: true,
      data: [120, 160, 95, 105, 98, 99, 167, 140, 155, 267, 237, 250]
    }
  ]
};

// total Profit Chart
let totalProfitChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  stacked: true,
  ticksValue: 'k',
  borderDash: [8, 4],
  xGridColor: Colors.white,
  xGridBorderColor: Colors.white,
  yGridBorderColor: Colors.white,
  maxTicksLimit: 20,
  datasets: [
    {
      borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 50, bottomRight: 50 },
      backgroundColor: Colors.primary,
      label: "Total Income",
      borderSkipped: false,
      data: [120, 160, 95, 105, 98, 99, 167, 140, 155, 267, 237, 250]

    },
    {
      borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 50, bottomRight: 50 },
      backgroundColor: Colors.success,
      label: "Total Profit",
      borderSkipped: false,
      data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95]
    },
    {
      borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 50, bottomRight: 50 },
      backgroundColor: Colors.gray300,
      label: "Total Expense",
      borderSkipped: false,
      data: [75, 90, 110, 80, 125, 55, 95, 75, 90, 110, 80, 125]
    }
  ]
};

// total sales knob chart
let totalSales = {
  size: 120,
  value: 65,
  angleOffset: -0.5,
  angleStart: 0.5,
  angleEnd: 0.5,
  colorFg: Colors.info
};

// total revenue Chart
let totalRevenueChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  yAxis: false,
  xAxis: false,
  datasets: [
    {
      tension: .4,
      label: "Total",
      borderColor: Colors.primary,
      backgroundColor: 'transparent',
      borderWidth: 4,
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: Colors.primary,
      borderCapStyle: 'round',
      data: [12, 40, 13, 130, 70, 210]
    }
  ]
};

// sales analytics Chart
let salesAnalyticsChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  borderDash: [8, 4],
  maxTicksLimit: 10,
  ticksValue: 'k',
  xAxis: false,
  xGridBorderColor: Colors.white,
  yGridBorderColor: Colors.white,
  datasets: [
    {
      tension: .4,
      borderWidth: 3,
      borderColor: Colors.yellow,
      backgroundColor: hexRGB(Colors.yellow, 0.2),
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      pointHoverBackgroundColor: Colors.yellow,
      label: "Total Sales",
      fill: true,
      data: [40, 60, 30, 65, 60, 95, 90, 100, 96, 120, 105, 134]
    },
    {
      tension: .4,
      borderWidth: 2,
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: Colors.danger,
      pointHoverBackgroundColor: Colors.danger,
      label: "Total Bookings",
      borderDash: [8, 4],
      data: [70, 44, 49, 78, 39, 49, 39, 38, 59, 80, 56, 101]
    },
  ]
};

function HomeEcommerce() {
  const [dashboardData, stDashboardData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [areaChat, setAreaChat] = useState(null)
  const getDashboardData = async () => {
    const { data, status } = await axios.get(("Dashboard/home"));

    if (status === 200 || status === 201) {
      stDashboardData(data);
    }
  }

  const getMapData = async () => {
    const { data, status } = await axios.get(("Dashboard/graph?year=2023"));
    if (status === 200 || status === 201) {

      setMapData({
        labels: data?.data?.label,
        stacked: true,
        ticksValue: 'k',
        borderDash: [8, 4],
        xGridColor: Colors.white,
        xGridBorderColor: Colors.white,
        yGridBorderColor: Colors.white,
        maxTicksLimit: 20,
        datasets: [
          {
            borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 50, bottomRight: 50 },
            backgroundColor: Colors.primary,
            label: "Online",
            borderSkipped: false,
            data: data?.data?.online

          },
          {
            borderRadius: { topLeft: 50, topRight: 50, bottomLeft: 50, bottomRight: 50 },
            backgroundColor: Colors.primary,
            label: "Offline",
            borderSkipped: false,
            data: data?.data?.offline
          },

        ]
      })

      setAreaChat({
        labels: data?.data?.label, borderDash: [8, 4],
        maxTicksLimit: 10,
        ticksValue: 'k',
        xAxis: false,
        xGridBorderColor: Colors.white,
        yGridBorderColor: Colors.white,
        datasets: [
          {
            tension: .4,
            borderWidth: 3,
            borderColor: Colors.yellow,
            backgroundColor: hexRGB(Colors.yellow, 0.2),
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointHoverBackgroundColor: Colors.yellow,
            label: "Online",
            fill: true,
            data: data?.data?.online
          },
          {
            tension: .4,
            borderWidth: 2,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            borderColor: Colors.danger,
            pointHoverBackgroundColor: Colors.danger,
            label: "Offline",
            borderDash: [8, 4],
            data: data?.data?.offline
          },
        ]
      })

    }
  }
  useEffect(() => {
    getDashboardData();
    getMapData();
  }, [])
  return (
    <Layout title="Dashboard">
      <Row className="g-gs">
        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>Total Revenue</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">{dashboardData?.total_revenue}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>No of Online Rooms</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Booked</div>
                <div className="amount h4 mb-0">{dashboardData?.today_online_rooms?.booked}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Vacant</div>
                <div className="amount h4 mb-0">{dashboardData?.today_online_rooms?.vacant}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Total</div>
                <div className="amount h4 mb-0">{dashboardData?.today_online_rooms?.total}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>No of Offline Rooms</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Booked</div>
                <div className="amount h4 mb-0">{dashboardData?.today_offline_rooms?.booked}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Vacant</div>
                <div className="amount h4 mb-0">{dashboardData?.today_offline_rooms?.vacant}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Total</div>
                <div className="amount h4 mb-0">{dashboardData?.today_offline_rooms?.total}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>Today Online Bookings</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Booked</div>
                <div className="amount h4 mb-0">{dashboardData?.today_online_bookings?.booked}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Rooms</div>
                <div className="amount h4 mb-0">{dashboardData?.today_online_bookings?.rooms}</div>
              </div>
             
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>Today Offline Bookings</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Booked</div>
                <div className="amount h4 mb-0">{dashboardData?.today_offline_bookings?.booked}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Rooms</div>
                <div className="amount h4 mb-0">{dashboardData?.today_offline_bookings?.rooms}</div>
              </div>
             
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6" xl="3" xxl="3">
          <Card className="h-100">
            <Card.Body>
              <Media shape="circle" variant="warning" className="mb-3">
                <Icon name="trend-up"></Icon>
              </Media>
              <h5>Hotels</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">All</div>
                <div className="amount h4 mb-0">{dashboardData?.hotels_count?.all}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Live</div>
                <div className="amount h4 mb-0">{dashboardData?.hotels_count?.live}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Pending</div>
                <div className="amount h4 mb-0">{dashboardData?.hotels_count?.pending}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="amount h4 mb-0">Suspended</div>
                <div className="amount h4 mb-0">{dashboardData?.hotels_count?.suspended}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xxl="4">
          <Card className="h-100">
              <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                      <div>
                          <div className="card-title">
                              <h4 className="title mb-1">Congratulations Property X!</h4>
                              <p className="small">Best seller of the month</p>
                          </div>
                          <div className="my-3">
                              <div className="amount h2 fw-bold text-primary">42.5k</div>
                              <div className="smaller">You have done 69.5% more bookings today.</div>
                          </div>
                      </div>
                      <div className="d-none d-sm-block d-xl-none d-xxl-block me-md-5 me-xxl-0">
                          <Image src="/images/award/a.png" alt=""/>
                      </div>
                  </div>
              </Card.Body>
          </Card>
        </Col> */}
        {/* <Col sm="6" xxl="4">
          <Card className="h-100">
              <Card.Body>
                  <div className="card-title">
                      <h4 className="title">New Visitors</h4>
                  </div>
                  <div className="d-flex justify-content-between align-items-end gap g-2">
                      <div className="flex-grow-1">
                          <div className="smaller">
                              <strong className="text-base">48%</strong> new visitors
                              <span className="d-block">this week.</span>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                              <div className="amount h2 mb-0 fw-bold">16,328</div>
                              <div className="change up smaller ms-1">
                                  <Icon name="trend-up"></Icon> 48
                              </div>
                          </div>
                      </div>
                      <div className="nk-chart-ecommerce-visitor">
                        <ChartBar data={visitorsChartData} />
                      </div>
                  </div>
              </Card.Body>
          </Card>
        </Col> */}
        {/* <Col sm="6" xxl="4">
          <Card className="h-100">
              <Card.Body>
                  <div className="card-title">
                    <h4 className="title">Activity</h4>
                  </div>
                  <div className="d-flex justify-content-between align-items-end gap g-2">
                      <div className="flex-grow-1">
                          <div className="smaller">
                              <strong className="text-base">70%</strong> new activity
                              <span className="d-block">this week.</span>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                              <div className="amount h2 mb-0 fw-bold">89,720</div>
                              <div className="change up smaller ms-1">
                                  <Icon name="trend-up"></Icon> 38
                              </div>
                          </div>
                      </div>
                      <div className="nk-chart-ecommerce-activity">
                          <ChartLine data={activityChart} />
                      </div>
                  </div>
              </Card.Body>
          </Card>
        </Col> */}
        <Col xxl="8">
          <Card className="h-100">
            <Row className="g-0 col-sep col-sep-md">
              <Col md="12">
                <Card.Body>
                  <div className="card-title-group mb-4">
                    <div className="card-title">
                      <h4 className="title">Total Bookings</h4>
                    </div>
                  </div>
                  <div className="nk-chart-ecommerce-total-profit">
                    <ChartBar data={mapData ?? totalProfitChart} />
                  </div>
                </Card.Body>
              </Col>

            </Row>
          </Card>
        </Col>

        <Col xxl="6">
          <Card className="h-100">
            <Card.Body>
              <div className="card-title-group">
                <div className="card-title">
                  <h4 className="title">Sales Analytics</h4>
                </div>
                <div className="card-tools">
                  <Dropdown>
                    <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
                      <Icon name="more-v"></Icon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
                      <Dropdown.Header className="py-2">
                        <h6 className="mb-0">Options</h6>
                      </Dropdown.Header>
                      <Dropdown.Divider className="mt-0" />
                      <Dropdown.Item>7 Days</Dropdown.Item>
                      <Dropdown.Item>15 Days</Dropdown.Item>
                      <Dropdown.Item>30 Days</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="nk-chart-ecommerce-sales-analytics mt-3">
                <ChartLine data={areaChat ?? salesAnalyticsChart} />
              </div>
              <ChartLegend.Group className="justify-content-center gap gx-4 pt-3">
                <div className="gap-col">
                  <ChartLegend symbol="warning">
                    Total Online
                  </ChartLegend>
                </div>
                <div className="gap-col">
                  <ChartLegend symbol="danger">
                    Total Offline
                  </ChartLegend>
                </div>
              </ChartLegend.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default HomeEcommerce;
