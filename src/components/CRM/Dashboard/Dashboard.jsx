import { loadCRMDashboardData } from "@/redux/rtk/features/dashboard/dashboardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Col, Row } from "antd";
import DemoLine from "./DemoLine";
import Content from "./Content";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCRMDashboardData({}));
  }, [dispatch]);
  return (
    <>
      <div
        className="overflow-y-auto overflow-x-hidden px-[2px]"
        style={{ height: "calc(100vh - 102px)" }}
      >
        <div className="mb-3">
          <Row>
            <Col span={24}>
              <DemoLine />
            </Col>
          </Row>
        </div>
        <div className="mt-10">
          <Content />
        </div>
        {/* <div>
            <Card title='ANNOUNCEMENTS' className='mb-5'>
              <AnnouncementBar />
            </Card>
          </div> */}
      </div>
    </>
  );
}
