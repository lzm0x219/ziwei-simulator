import { UndoOutlined } from "@ant-design/icons";
import { snapdom } from "@zumer/snapdom";
import {
  Button,
  Space,
  Flex,
  Switch,
  Segmented,
  Checkbox,
  ColorPicker,
  Typography,
  Tag,
  ConfigProvider,
  Tooltip,
} from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import {
  BRANCH_OPTIONS,
  STEM_OPTIONS,
  MONTH_OPTIONS,
  FIVE_ELEMENT_COLOR,
  TRANSFORMATION_NAME,
} from "../constants";
import { RenderContainer } from "../hooks/useRender";
import { RuntimeContainer } from "../hooks/useRuntime";
import { defualtFlyingTransformationFill, SimulatorContainer } from "../hooks/useSimulator";
import { wrapIndex } from "../utils/array";
import { getScreenshotFilename, isValidNumber } from "../utils/base";
import Section from "./Section";

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: ${token.paddingMD}px ${token.paddingLG}px;
    flex: 1;
  `,
}));

const TRANSFORMATION_OPTIONS = [
  { label: "生年禄", value: "A" },
  { label: "生年权", value: "B" },
  { label: "生年科", value: "C" },
  { label: "生年忌", value: "D" },
];

const SELF_TRANSFORMATION_OPTIONS = [
  { label: "自化禄", value: "A" },
  { label: "自化权", value: "B" },
  { label: "自化科", value: "C" },
  { label: "自化忌", value: "D" },
];

export default function SimulatorSetting() {
  const { styles } = useStyles();

  const { flyingTransformationFill, setSimulator } = SimulatorContainer.useContainer();

  const runtime = RuntimeContainer.useContainer();

  const render = RenderContainer.useContainer();

  const [branchOptions, setBranchOptions] = useState(BRANCH_OPTIONS);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Section title="排盘信息">
        <Flex vertical gap={12}>
          <Flex gap={20}>
            <Space align="center">
              <Typography.Text>性別</Typography.Text>
              <ConfigProvider
                theme={{
                  components: {
                    Segmented: {
                      itemSelectedBg: "#FFFBF0",
                    },
                  },
                }}
              >
                <Segmented
                  size="middle"
                  shape="round"
                  value={runtime.gender}
                  options={[
                    { label: "男", value: 1 },
                    { label: "女", value: 0 },
                  ]}
                  onChange={runtime.setGender}
                />
              </ConfigProvider>
            </Space>
            {runtime.fiveElementNum && (
              <Space>
                <Tag
                  variant="filled"
                  color={FIVE_ELEMENT_COLOR?.[runtime.fiveElementNum]}
                  styles={{
                    root: {
                      fontSize: 14,
                    },
                  }}
                >
                  {runtime?.fiveElementName}
                </Tag>
              </Space>
            )}
          </Flex>

          <Space align="center">
            <Typography.Text>天干</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                options={STEM_OPTIONS}
                defaultValue={Infinity}
                value={runtime.stem}
                onChange={(stem) => {
                  runtime.setStem(stem);
                  const vaildBranchOptions = branchOptions.map((item, index) => ({
                    ...item,
                    disabled: index % 2 !== stem % 2,
                  }));
                  if (isValidNumber(runtime.branch)) {
                    runtime.setBranch(vaildBranchOptions.findIndex((item) => !item.disabled));
                  }
                  setBranchOptions(vaildBranchOptions);
                }}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>地支</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                disabled={!isValidNumber(runtime.stem)}
                options={branchOptions}
                defaultValue={Infinity}
                value={runtime.branch}
                onChange={runtime.setBranch}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>紫微</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                options={BRANCH_OPTIONS}
                defaultValue={Infinity}
                value={runtime.ziwei}
                onChange={runtime.setZiwei}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>月份</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                options={MONTH_OPTIONS}
                defaultValue={Infinity}
                value={runtime.month}
                onChange={(month) => {
                  if (isValidNumber(month) && isValidNumber(runtime.hour)) {
                    runtime.setMain(wrapIndex(month - runtime.hour + 2));
                  }
                  runtime.setMonth(month);
                }}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>时辰</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                options={BRANCH_OPTIONS}
                defaultValue={Infinity}
                value={runtime.hour}
                onChange={(hour) => {
                  if (isValidNumber(runtime.month) && isValidNumber(hour)) {
                    runtime.setMain(wrapIndex(runtime.month - hour + 2));
                  }
                  runtime.setHour(hour);
                }}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>命宫</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                options={BRANCH_OPTIONS}
                disabled={!isValidNumber(runtime.stem) || !isValidNumber(runtime.ziwei)}
                defaultValue={Infinity}
                value={runtime.main}
                onChange={(main) => {
                  runtime.setMain(main);
                  runtime.setMonth(Infinity);
                  runtime.setHour(Infinity);
                }}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>大限</Typography.Text>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Segmented
                disabled={!isValidNumber(runtime.main)}
                options={BRANCH_OPTIONS}
                defaultValue={Infinity}
                value={runtime.decade}
                onChange={runtime.setDecade}
              />
            </ConfigProvider>
          </Space>
          <Space align="center">
            <Typography.Text>流年</Typography.Text>

            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FFFBF0",
                  },
                },
              }}
            >
              <Space>
                <Segmented
                  disabled={!isValidNumber(runtime.decade)}
                  options={BRANCH_OPTIONS}
                  defaultValue={Infinity}
                  value={runtime.yearly}
                  onChange={runtime.setYearly}
                />
                <Tooltip title="重置">
                  <Button
                    color="danger"
                    variant="filled"
                    icon={<UndoOutlined />}
                    onClick={() => {
                      runtime.setYearly(Infinity);
                    }}
                  />
                </Tooltip>
              </Space>
            </ConfigProvider>
          </Space>
        </Flex>
      </Section>
      <Section title="显示设置">
        <Flex vertical gap={12}>
          <Space size={30}>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>来因</Typography.Text>
              <Switch size="small" value={render.showLaiYin} onChange={render.setShowLaiYin} />
            </Flex>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>宫干</Typography.Text>
              <ConfigProvider>
                <Switch size="small" value={render.showStem} onChange={render.setShowStem} />
              </ConfigProvider>
            </Flex>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>宫支</Typography.Text>
              <Switch size="small" value={render.showBranch} onChange={render.setShowBranch} />
            </Flex>
          </Space>
          <Space size={30}>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>宫职</Typography.Text>
              <ConfigProvider>
                <Switch
                  size="small"
                  value={render.showPalaceName}
                  onChange={render.setShowPalaceName}
                />
              </ConfigProvider>
            </Flex>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>流年</Typography.Text>
              <Switch size="small" value={render.showYearly} onChange={render.setShowYearly} />
            </Flex>
            <Flex align="center" gap={10} justify="space-between">
              <Typography.Text>位星</Typography.Text>
              <Switch
                size="small"
                value={render.showLocationStar}
                onChange={render.setShowLocationStar}
              />
            </Flex>
          </Space>
          <Flex align="center" gap={10}>
            <Typography.Text>生年</Typography.Text>
            <Space>
              <Checkbox
                indeterminate={
                  render.showTransformation.length > 0 &&
                  render.showTransformation.length < TRANSFORMATION_OPTIONS.length
                }
                checked={render.showTransformation.length === TRANSFORMATION_OPTIONS.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    render.setShowTransformation(TRANSFORMATION_OPTIONS.map((o) => o.value));
                  } else {
                    render.setShowTransformation([]);
                  }
                }}
              >
                全部
              </Checkbox>
              <Checkbox.Group
                options={TRANSFORMATION_OPTIONS}
                value={render.showTransformation}
                onChange={render.setShowTransformation}
              />
            </Space>
          </Flex>
          <Flex align="center" gap={10}>
            <Typography.Text>自化</Typography.Text>
            <Space>
              <Checkbox
                indeterminate={
                  render.showSelfTransformation.length > 0 &&
                  render.showSelfTransformation.length < SELF_TRANSFORMATION_OPTIONS.length
                }
                checked={
                  render.showSelfTransformation.length === SELF_TRANSFORMATION_OPTIONS.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    render.setShowSelfTransformation(
                      SELF_TRANSFORMATION_OPTIONS.map((o) => o.value),
                    );
                  } else {
                    render.setShowSelfTransformation([]);
                  }
                }}
              >
                全部
              </Checkbox>
              <Checkbox.Group
                options={SELF_TRANSFORMATION_OPTIONS}
                value={render.showSelfTransformation}
                onChange={render.setShowSelfTransformation}
              />
            </Space>
          </Flex>
        </Flex>
      </Section>
      <Section title="个性化">
        <Space size={40}>
          <Typography.Text>飞宫颜色</Typography.Text>
          <Flex gap={20}>
            {TRANSFORMATION_NAME.map((name, index) => (
              <Space align="center" key={name}>
                <Typography.Text>{name}</Typography.Text>
                <ColorPicker
                  value={flyingTransformationFill[index]}
                  size="small"
                  onChange={(color) => {
                    setSimulator((pre) => ({
                      ...pre,
                      flyingTransformationFill: pre.flyingTransformationFill.toSpliced(
                        index,
                        1,
                        color.toHexString(),
                      ),
                    }));
                  }}
                />
              </Space>
            ))}
          </Flex>
          <Tooltip title="重置">
            <Button
              color="danger"
              variant="filled"
              icon={<UndoOutlined />}
              onClick={() => {
                setSimulator((pre) => ({
                  ...pre,
                  flyingTransformationFill: defualtFlyingTransformationFill,
                }));
              }}
            />
          </Tooltip>
        </Space>
      </Section>

      <Button
        color="default"
        variant="solid"
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await snapdom.download(document.getElementById("simulator")!, {
            embedFonts: true,
            filename: getScreenshotFilename({
              stem: runtime.stem,
              branch: runtime.branch,
              ziwei: runtime.ziwei,
              gender: runtime.gender,
            }),
            scale: 2,
            localFonts: [
              {
                src: "/fonts/SourceHanSerifCN-Light.woff2",
                family: "Source Han Serif CN",
                weight: 300,
              },
              {
                src: "/fonts/SourceHanSerifCN-Regular.woff2",
                family: "Source Han Serif CN",
                weight: 400,
                style: "normal",
              },
              {
                src: "/fonts/SourceHanSerifCN-Medium.woff2",
                family: "Source Han Serif CN",
                weight: 500,
              },
              {
                src: "/fonts/SourceHanSerifCN-SemiBold.woff2",
                family: "Source Han Serif CN",
                weight: 600,
              },
              {
                src: "/fonts/SourceHanSerifCN-Bold.woff2",
                family: "Source Han Serif CN",
                weight: 700,
              },
            ],
            cache: "disabled",
          });

          setLoading(false);
        }}
      >
        导出图片
      </Button>
    </div>
  );
}
