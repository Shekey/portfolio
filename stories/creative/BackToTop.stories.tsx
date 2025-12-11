import type { Meta, StoryObj } from "@storybook/react";
import { BackToTop } from "@/components/creative/BackToTop";

const meta: Meta<typeof BackToTop> = {
  title: "Creative/BackToTop",
  component: BackToTop,
  parameters: { layout: "fullscreen", viewMode: { isCreative: true } },
};

export default meta;

type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {};

