import React from "react";
import { Input, Select, Space } from "antd";

export default function stage1() {
  return (
    <div className="container flexed-column">
      <h1>Welcome to Stage 1</h1>

      {/* Job Candidate Basic info */}
      <div className="basicInfo">
        <h2>Basic Information</h2>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Input allowClear placeholder="Enter your name" />
        <Input allowClear type="email" placeholder="Enter your email" />
        <Input
          allowClear
          type="tel"
          suffix="+88"
          placeholder="Enter your phone number"
        />

        <Select placeholder="Select the job you are applying for" allowClear
        options={[
          { value: "frontend", label: "Frontend Developer" },
          { value: "backend", label: "Backend Developer" },
          { value: "fullstack", label: "Fullstack Developer" },
        ]}
        />
        </Space>

        {/* <input
          type="text"
          placeholder="Enter your name"
          className="input"
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
        ></input>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="input"
        ></input>
        <select
          className="input"
          defaultValue=""
        >
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Fullstack Developer</option>
        </select> */}

      </div>
    </div>
  );
}
