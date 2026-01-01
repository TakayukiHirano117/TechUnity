import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Circle from "./Circle";

const meta = {
  component: Circle,
  title: "Example/Circle",
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["orange", "green", "yellow"],
      },
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Circle>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * オレンジ色の円です。
 */
export const BaseCircle: Story = {
  args: {
    variant: "orange",
  },
};

/**
 * 緑色の円です。
 */
export const GreenCircle: Story = {
  args: {
    variant: "green",
  },
};

/**
 * 黄色の円です。
 */
export const YellowCircle: Story = {
  args: {
    variant: "yellow",
  },
};

// export const GroupedCircle = {
//   render: () => (
//     <div>
//       <Circle variant="orange" />
//       <Circle variant="green" />
//       <Circle variant="yellow" />
//     </div>
//   )
// }