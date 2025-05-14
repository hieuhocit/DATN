/** MUI */
import { Paper, Typography, Box, useTheme, Avatar, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/** recharts */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/** utils */
import { formatNumber } from "@/utils/formatNumber";
import { useState } from "react";
import { statsInstructorConfig } from "@/utils/enum/stats.enum";
import { useStats } from "@/hooks/useIntructorStats";
import { InstructorStatField } from "@/services/statisticsService";

export default function Statistical() {
  const theme = useTheme();
  const { data: res } = useStats();

  const [selectedStat, setSelectedStat] = useState<InstructorStatField>("user");

  const handleStatClick = (field: InstructorStatField) => {
    setSelectedStat(field);
  };

  if (!res) return null;

  const data = res.data;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {statsInstructorConfig.map((stat) => {
          const { total, percent } = data[stat.field];
          const isPositive = percent >= 0;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={stat.title}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  cursor: "pointer",
                  border:
                    selectedStat === stat.field
                      ? `2px solid ${stat.color}`
                      : "none",
                  bgcolor:
                    selectedStat === stat.field
                      ? `${stat.color}10`
                      : "background.paper",
                }}
                onClick={() => handleStatClick(stat.field)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      {stat.field === "revenue"
                        ? `${formatNumber(total)}₫`
                        : formatNumber(total)}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                    {stat.icon}
                  </Avatar>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  {isPositive ? (
                    <ArrowUpwardIcon color="success" fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon color="error" fontSize="small" />
                  )}
                  <Typography
                    variant="body2"
                    color={isPositive ? "success.main" : "error.main"}
                  >
                    {isPositive ? `+${percent}` : percent}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Kể từ tuần trước
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          );
        })}

        {selectedStat && (
          <Grid size={12} width={1}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {
                  statsInstructorConfig.find(
                    (stat) => stat.field === selectedStat
                  )?.chartTitle
                }
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={data[selectedStat].chartData}
                  margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={
                          statsInstructorConfig.find(
                            (stat) => stat.field === selectedStat
                          )?.color
                        }
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          statsInstructorConfig.find(
                            (stat) => stat.field === selectedStat
                          )?.color
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="1 1"
                    stroke={theme.palette.divider}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={theme.palette.text.secondary}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={
                      statsInstructorConfig.find(
                        (stat) => stat.field === selectedStat
                      )?.color
                    }
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
