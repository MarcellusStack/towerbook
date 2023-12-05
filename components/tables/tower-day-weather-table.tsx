"use client";

import { roles } from "@/constants/roles";
import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  Button,
  NumberInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { convertTime } from "@utils/index";
import { z } from "zod";
import { towerDayWeatherSchema } from "@/schemas";
import { createFormActions } from "@mantine/form";

export type TowerDayWeatherProps = z.infer<typeof towerDayWeatherSchema>;

export type TowerDayWeatherTableRowProps = {
  id: string;
  time: string;
  air_in_celsius: string;
  water_in_celsius: string;
  wind_in_bft: string;
};

export const TowerDayWeatherTableRow = ({
  weather,
  index,
}: {
  weather: TowerDayWeatherTableRowProps;
  index: number;
}) => {
  const formAction = createFormActions("tower-day-weather-form");

  return (
    <Table.Tr key={weather.id}>
      <Table.Td>
        <Text size="sm">{convertTime(new Date(weather.time))}</Text>
      </Table.Td>
      <Table.Td>
        <NumberInput
          prefix="°C"
          {...formAction.getInputProps(`todo.${index}.todo`)}
        />
      </Table.Td>
      <Table.Td>
        <Text size="sm">{weather.water_in_celsius}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{weather.wind_in_bft}</Text>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          onClick={() => {
            formAction.removeListItem("weather", index);
          }}
          variant="subtle"
          color="red"
        >
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

export const TowerDayWeatherTable = ({
  towerWeather,
}: {
  towerWeather: TowerDayWeatherProps;
}) => {
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Zeit</Table.Th>
            <Table.Th>Luft (in °C)</Table.Th>
            <Table.Th>Wasser (in °C)</Table.Th>
            <Table.Th>Wind (in Bft/°)</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {towerWeather.weather.map((weather, index) => (
            <TowerDayWeatherTableRow
              key={weather.id}
              index={index}
              weather={weather}
            />
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
