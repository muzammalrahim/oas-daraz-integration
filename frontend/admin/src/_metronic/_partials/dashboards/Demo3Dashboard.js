import React, {useState, useEffect} from "react";
import { StatsWidget10 } from "../widgets/stats/StatsWidget10";
import { StatsWidget11 } from "../widgets/stats/StatsWidget11";
import { StatsWidget12} from "../widgets/stats/StatsWidget12";
import { StatsWidget13 } from "../widgets/stats/StatsWidget13";
import { StatsWidget14 } from "../widgets/stats/StatsWidget14";
import { StatsWidget15 } from "../widgets/stats/StatsWidget15";
import { list } from "../../../app/pages/helper/api";

export function Demo3Dashboard() {
  const [count, setCount] = useState(0)
  
  const getCount = ()=>{
    list("user_dashboard").then((response)=>{
      setCount(response.data)
    })
  }
  useEffect(()=>{
    getCount()
  }, [])
  return (
    <>
      {/* begin::Dashboard */}
      {/* begin::Row */}
      <div className="row" style={{ marginTop: "40px" }}>
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget11
                className="gutter-b"
                symbolShape="circle"
                baseColor="danger"
                id="kt_stats_widget_11_chart_1"
                totalCategories={count?.product_category_count || 0}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget10
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
                id="kt_stats_widget_10_chart_1"
                totalInventories={count.inventory_count}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget12
                className="gutter-b"
                symbolShape="circle"
                baseColor="danger"
                id="kt_stats_widget_11_chart_2"
                totalCustomers={count.customer_count}
              />
            </div>
          </div>
        </div>
       
      {/* </div>
      <div className="row"> */}
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget13
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
                id="kt_stats_widget_10_chart_2"
                totalSuppliers={count.supplier_count}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget15
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
                id="kt_stats_widget_11_chart_3"
                totalManufacturers={count.manufactur_count}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget14
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
                id="kt_stats_widget_10_chart_3"
                totalEnquiries={count.enquiry_count}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end::Row */}
      {/* end::Dashboard */}
    </>
  );
}
