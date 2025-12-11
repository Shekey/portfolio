import type { Meta, StoryObj } from "@storybook/react";
import { Contact } from "@/components/creative/Contact";

const meta: Meta<typeof Contact> = {
  title: "Creative/Contact",
  component: Contact,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Contact>;

export const Default: Story = {};

