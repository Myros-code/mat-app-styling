//last change: 20210509_13:00

import { userSetup, userInput } from "./settings.js";
import { brine } from "./brine.js";
import { stat } from "./settings.js";
import { tableLookup } from "./scales.js";
import PolynomialRegression from "./PolynomialRegression"
//to do: pressure calculation for low reynolds numbers


const britishStandard = {
	tableA1 : [
		{val: 1.23, x: 0},
		{val: 1.188, x: 0.05},
		{val: 1.156, x: 0.1},
		{val: 1.134, x: 0.15},
	],
	tableA2 : [
		{val: 1.069, x: 0, y: 0.05},
		{val: 1.056, x: 0.05, y: 0.05},
		{val: 1.043, x: 0.1, y: 0.05},
		{val: 1.037, x: 0.15, y: 0.05},

		{val: 1.066, x: 0, y: 0.075},
		{val: 1.053, x: 0.05, y: 0.075},
		{val: 1.041, x: 0.1, y: 0.075},
		{val: 1.035, x: 0.15, y: 0.075},

		{val: 1.063, x: 0, y: 0.1},
		{val: 1.05, x: 0.05, y: 0.1},
		{val: 1.039, x: 0.1, y: 0.1},
		{val: 1.0335, x: 0.15, y: 0.1},

		{val: 1.057, x: 0, y: 0.15},
		{val: 1.046, x: 0.05, y: 0.15},
		{val: 1.035, x: 0.1, y: 0.15},
		{val: 1.0305, x: 0.15, y: 0.15},

		{val: 1.051, x: 0, y: 0.2},
		{val: 1.041, x: 0.05, y: 0.2},
		{val: 1.0315, x: 0.1, y: 0.2},
		{val: 1.0275, x: 0.15, y: 0.2},

		{val: 1.048, x: 0, y: 0.225},
		{val: 1.038, x: 0.05, y: 0.225},
		{val: 1.0295, x: 0.1, y: 0.225},
		{val: 1.026, x: 0.15, y: 0.225},

		{val: 1.0395, x: 0, y: 0.3},
		{val: 1.031, x: 0.05, y: 0.3},
		{val: 1.024, x: 0.1, y: 0.3},
		{val: 1.021, x: 0.15, y: 0.3},

		{val: 1.03, x: 0, y: 0.375},
		{val: 1.0221, x: 0.05, y: 0.375},
		{val: 1.0181, x: 0.1, y: 0.375},
		{val: 1.015, x: 0.15, y: 0.375},
	],
	tableA3 : [
		{val: 1.013, x: 0, y: 0.05},
		{val: 1.013, x: 0.05, y: 0.05},
		{val: 1.012, x: 0.1, y: 0.05},
		{val: 1.011, x: 0.15, y: 0.05},

		{val: 1.021, x: 0, y: 0.075},
		{val: 1.019, x: 0.05, y: 0.075},
		{val: 1.016, x: 0.1, y: 0.075},
		{val: 1.014, x: 0.15, y: 0.075},

		{val: 1.029, x: 0, y: 0.1},
		{val: 1.025, x: 0.05, y: 0.1},
		{val: 1.022, x: 0.1, y: 0.1},
		{val: 1.018, x: 0.15, y: 0.1},

		{val: 1.040, x: 0, y: 0.15},
		{val: 1.034, x: 0.05, y: 0.15},
		{val: 1.029, x: 0.1, y: 0.15},
		{val: 1.024, x: 0.15, y: 0.15},

		{val: 1.046, x: 0, y: 0.2},
		{val: 1.040, x: 0.05, y: 0.2},
		{val: 1.035, x: 0.1, y: 0.2},
		{val: 1.030, x: 0.15, y: 0.2},

		{val: 1.049, x: 0, y: 0.225},
		{val: 1.043, x: 0.05, y: 0.225},
		{val: 1.038, x: 0.1, y: 0.225},
		{val: 1.033, x: 0.15, y: 0.225},

		{val: 1.053, x: 0, y: 0.3},
		{val: 1.049, x: 0.05, y: 0.3},
		{val: 1.044, x: 0.1, y: 0.3},
		{val: 1.039, x: 0.15, y: 0.3},

		{val: 1.056, x: 0, y: 0.375},
		{val: 1.051, x: 0.05, y: 0.375},
		{val: 1.046, x: 0.1, y: 0.375},
		{val: 1.042, x: 0.15, y: 0.375},				
	],
	tableA7 : [
		{val: 1, x: 0.05},
		{val: 1, x: 0.075},
		{val: 1, x: 0.1},
		{val: 0.7, x: 0.15},
		{val: 0.5, x: 0.2},
		{val: 0.43, x: 0.225},
		{val: 0.25, x: 0.3},
		{val: 0.1, x: 0.375},
		{val: 0.0, x: 0.45},
	],
	tableA8 : [
	{val: 0.82, x: 0.014, y: 0.05, z: 0 },
	{val: 0.86, x: 0.016, y: 0.05, z: 0 },
	{val: 0.9, x: 0.018, y: 0.05, z: 0 },
	{val: 0.93, x: 0.02, y: 0.05, z: 0 },
	{val: 0.96, x: 0.022, y: 0.05, z: 0 },
	{val: 0.59, x: 0.014, y: 0.075, z: 0 },
	{val: 0.644, x: 0.016, y: 0.075, z: 0 },
	{val: 0.7, x: 0.018, y: 0.075, z: 0 },
	{val: 0.754, x: 0.02, y: 0.075, z: 0 },
	{val: 0.8, x: 0.022, y: 0.075, z: 0 },
	{val: 0.488, x: 0.014, y: 0.1, z: 0 },
	{val: 0.533, x: 0.016, y: 0.1, z: 0 },
	{val: 0.576, x: 0.018, y: 0.1, z: 0 },
	{val: 0.617, x: 0.02, y: 0.1, z: 0 },
	{val: 0.658, x: 0.022, y: 0.1, z: 0 },
	{val: 0.387, x: 0.014, y: 0.15, z: 0 },
	{val: 0.415, x: 0.016, y: 0.15, z: 0 },
	{val: 0.444, x: 0.018, y: 0.15, z: 0 },
	{val: 0.47, x: 0.02, y: 0.15, z: 0 },
	{val: 0.505, x: 0.022, y: 0.15, z: 0 },
	{val: 0.337, x: 0.014, y: 0.2, z: 0 },
	{val: 0.357, x: 0.016, y: 0.2, z: 0 },
	{val: 0.379, x: 0.018, y: 0.2, z: 0 },
	{val: 0.4, x: 0.02, y: 0.2, z: 0 },
	{val: 0.422, x: 0.022, y: 0.2, z: 0 },
	{val: 0.32, x: 0.014, y: 0.225, z: 0 },
	{val: 0.34, x: 0.016, y: 0.225, z: 0 },
	{val: 0.357, x: 0.018, y: 0.225, z: 0 },
	{val: 0.376, x: 0.02, y: 0.225, z: 0 },
	{val: 0.396, x: 0.022, y: 0.225, z: 0 },
	{val: 0.288, x: 0.014, y: 0.3, z: 0 },
	{val: 0.3, x: 0.016, y: 0.3, z: 0 },
	{val: 0.315, x: 0.018, y: 0.3, z: 0 },
	{val: 0.33, x: 0.02, y: 0.3, z: 0 },
	{val: 0.344, x: 0.022, y: 0.3, z: 0 },
	{val: 0.266, x: 0.014, y: 0.375, z: 0 },
	{val: 0.278, x: 0.016, y: 0.375, z: 0 },
	{val: 0.29, x: 0.018, y: 0.375, z: 0 },
	{val: 0.3, x: 0.02, y: 0.375, z: 0 },
	{val: 0.312, x: 0.022, y: 0.375, z: 0 },
	{val: 0.25, x: 0.014, y: 0.45, z: 0 },
	{val: 0.264, x: 0.016, y: 0.45, z: 0 },
	{val: 0.28, x: 0.018, y: 0.45, z: 0 },
	{val: 0.29, x: 0.02, y: 0.45, z: 0 },
	{val: 0.3, x: 0.022, y: 0.45, z: 0 },
	{val: 0.88, x: 0.014, y: 0.05, z: 0.1 },
	{val: 0.905, x: 0.016, y: 0.05, z: 0.1 },
	{val: 0.93, x: 0.018, y: 0.05, z: 0.1 },
	{val: 0.955, x: 0.02, y: 0.05, z: 0.1 },
	{val: 0.975, x: 0.022, y: 0.05, z: 0.1 },
	{val: 0.74, x: 0.014, y: 0.075, z: 0.1 },
	{val: 0.776, x: 0.016, y: 0.075, z: 0.1 },
	{val: 0.812, x: 0.018, y: 0.075, z: 0.1 },
	{val: 0.836, x: 0.02, y: 0.075, z: 0.1 },
	{val: 0.859, x: 0.022, y: 0.075, z: 0.1 },
	{val: 0.66, x: 0.014, y: 0.1, z: 0.1 },
	{val: 0.693, x: 0.016, y: 0.1, z: 0.1 },
	{val: 0.726, x: 0.018, y: 0.1, z: 0.1 },
	{val: 0.76, x: 0.02, y: 0.1, z: 0.1 },
	{val: 0.77, x: 0.022, y: 0.1, z: 0.1 },
	{val: 0.561, x: 0.014, y: 0.15, z: 0.1 },
	{val: 0.58, x: 0.016, y: 0.15, z: 0.1 },
	{val: 0.6, x: 0.018, y: 0.15, z: 0.1 },
	{val: 0.621, x: 0.02, y: 0.15, z: 0.1 },
	{val: 0.642, x: 0.022, y: 0.15, z: 0.1 },
	{val: 0.49, x: 0.014, y: 0.2, z: 0.1 },
	{val: 0.51, x: 0.016, y: 0.2, z: 0.1 },
	{val: 0.53, x: 0.018, y: 0.2, z: 0.1 },
	{val: 0.55, x: 0.02, y: 0.2, z: 0.1 },
	{val: 0.57, x: 0.022, y: 0.2, z: 0.1 },
	{val: 0.467, x: 0.014, y: 0.225, z: 0.1 },
	{val: 0.485, x: 0.016, y: 0.225, z: 0.1 },
	{val: 0.504, x: 0.018, y: 0.225, z: 0.1 },
	{val: 0.522, x: 0.02, y: 0.225, z: 0.1 },
	{val: 0.54, x: 0.022, y: 0.225, z: 0.1 },
	{val: 0.435, x: 0.014, y: 0.3, z: 0.1 },
	{val: 0.444, x: 0.016, y: 0.3, z: 0.1 },
	{val: 0.453, x: 0.018, y: 0.3, z: 0.1 },
	{val: 0.462, x: 0.02, y: 0.3, z: 0.1 },
	{val: 0.472, x: 0.022, y: 0.3, z: 0.1 },
	{val: 0.411, x: 0.014, y: 0.375, z: 0.1 },
	{val: 0.421, x: 0.016, y: 0.375, z: 0.1 },
	{val: 0.434, x: 0.018, y: 0.375, z: 0.1 },
	{val: 0.446, x: 0.02, y: 0.375, z: 0.1 },
	{val: 0.46, x: 0.022, y: 0.375, z: 0.1 },
	{val: 0.41, x: 0.014, y: 0.45, z: 0.1 },
	{val: 0.42, x: 0.016, y: 0.45, z: 0.1 },
	{val: 0.43, x: 0.018, y: 0.45, z: 0.1 },
	{val: 0.44, x: 0.02, y: 0.45, z: 0.1 },
	{val: 0.45, x: 0.022, y: 0.45, z: 0.1 },
	{val: 0.92, x: 0.014, y: 0.05, z: 0.2 },
	{val: 0.937, x: 0.016, y: 0.05, z: 0.2 },
	{val: 0.955, x: 0.018, y: 0.05, z: 0.2 },
	{val: 0.97, x: 0.02, y: 0.05, z: 0.2 },
	{val: 0.985, x: 0.022, y: 0.05, z: 0.2 },
	{val: 0.845, x: 0.014, y: 0.075, z: 0.2 },
	{val: 0.865, x: 0.016, y: 0.075, z: 0.2 },
	{val: 0.885, x: 0.018, y: 0.075, z: 0.2 },
	{val: 0.893, x: 0.02, y: 0.075, z: 0.2 },
	{val: 0.902, x: 0.022, y: 0.075, z: 0.2 },
	{val: 0.81, x: 0.014, y: 0.1, z: 0.2 },
	{val: 0.821, x: 0.016, y: 0.1, z: 0.2 },
	{val: 0.832, x: 0.018, y: 0.1, z: 0.2 },
	{val: 0.843, x: 0.02, y: 0.1, z: 0.2 },
	{val: 0.855, x: 0.022, y: 0.1, z: 0.2 },
	{val: 0.735, x: 0.014, y: 0.15, z: 0.2 },
	{val: 0.745, x: 0.016, y: 0.15, z: 0.2 },
	{val: 0.755, x: 0.018, y: 0.15, z: 0.2 },
	{val: 0.765, x: 0.02, y: 0.15, z: 0.2 },
	{val: 0.775, x: 0.022, y: 0.15, z: 0.2 },
	{val: 0.68, x: 0.014, y: 0.2, z: 0.2 },
	{val: 0.688, x: 0.016, y: 0.2, z: 0.2 },
	{val: 0.695, x: 0.018, y: 0.2, z: 0.2 },
	{val: 0.703, x: 0.02, y: 0.2, z: 0.2 },
	{val: 0.71, x: 0.022, y: 0.2, z: 0.2 },
	{val: 0.655, x: 0.014, y: 0.225, z: 0.2 },
	{val: 0.663, x: 0.016, y: 0.225, z: 0.2 },
	{val: 0.67, x: 0.018, y: 0.225, z: 0.2 },
	{val: 0.678, x: 0.02, y: 0.225, z: 0.2 },
	{val: 0.685, x: 0.022, y: 0.225, z: 0.2 },
	{val: 0.585, x: 0.014, y: 0.3, z: 0.2 },
	{val: 0.592, x: 0.016, y: 0.3, z: 0.2 },
	{val: 0.6, x: 0.018, y: 0.3, z: 0.2 },
	{val: 0.608, x: 0.02, y: 0.3, z: 0.2 },
	{val: 0.615, x: 0.022, y: 0.3, z: 0.2 },
	{val: 0.55, x: 0.014, y: 0.375, z: 0.2 },
	{val: 0.558, x: 0.016, y: 0.375, z: 0.2 },
	{val: 0.565, x: 0.018, y: 0.375, z: 0.2 },
	{val: 0.573, x: 0.02, y: 0.375, z: 0.2 },
	{val: 0.58, x: 0.022, y: 0.375, z: 0.2 },
	{val: 0.55, x: 0.014, y: 0.45, z: 0.2 },
	{val: 0.555, x: 0.016, y: 0.45, z: 0.2 },
	{val: 0.56, x: 0.018, y: 0.45, z: 0.2 },
	{val: 0.565, x: 0.02, y: 0.45, z: 0.2 },
	{val: 0.57, x: 0.022, y: 0.45, z: 0.2 },
	{val: 0.95, x: 0.014, y: 0.05, z: 0.3 },
	{val: 0.96, x: 0.016, y: 0.05, z: 0.3 },
	{val: 0.97, x: 0.018, y: 0.05, z: 0.3 },
	{val: 0.98, x: 0.02, y: 0.05, z: 0.3 },
	{val: 0.99, x: 0.022, y: 0.05, z: 0.3 },
	{val: 0.92, x: 0.014, y: 0.075, z: 0.3 },
	{val: 0.925, x: 0.016, y: 0.075, z: 0.3 },
	{val: 0.93, x: 0.018, y: 0.075, z: 0.3 },
	{val: 0.935, x: 0.02, y: 0.075, z: 0.3 },
	{val: 0.94, x: 0.022, y: 0.075, z: 0.3 },
	{val: 0.9, x: 0.014, y: 0.1, z: 0.3 },
	{val: 0.905, x: 0.016, y: 0.1, z: 0.3 },
	{val: 0.91, x: 0.018, y: 0.1, z: 0.3 },
	{val: 0.915, x: 0.02, y: 0.1, z: 0.3 },
	{val: 0.92, x: 0.022, y: 0.1, z: 0.3 },
	{val: 0.855, x: 0.014, y: 0.15, z: 0.3 },
	{val: 0.855, x: 0.016, y: 0.15, z: 0.3 },
	{val: 0.855, x: 0.018, y: 0.15, z: 0.3 },
	{val: 0.855, x: 0.02, y: 0.15, z: 0.3 },
	{val: 0.855, x: 0.022, y: 0.15, z: 0.3 },
	{val: 0.8, x: 0.014, y: 0.2, z: 0.3 },
	{val: 0.8, x: 0.016, y: 0.2, z: 0.3 },
	{val: 0.8, x: 0.018, y: 0.2, z: 0.3 },
	{val: 0.8, x: 0.02, y: 0.2, z: 0.3 },
	{val: 0.8, x: 0.022, y: 0.2, z: 0.3 },
	{val: 0.79, x: 0.014, y: 0.225, z: 0.3 },
	{val: 0.79, x: 0.016, y: 0.225, z: 0.3 },
	{val: 0.79, x: 0.018, y: 0.225, z: 0.3 },
	{val: 0.79, x: 0.02, y: 0.225, z: 0.3 },
	{val: 0.79, x: 0.022, y: 0.225, z: 0.3 },
	{val: 0.72, x: 0.014, y: 0.3, z: 0.3 },
	{val: 0.72, x: 0.016, y: 0.3, z: 0.3 },
	{val: 0.72, x: 0.018, y: 0.3, z: 0.3 },
	{val: 0.72, x: 0.02, y: 0.3, z: 0.3 },
	{val: 0.72, x: 0.022, y: 0.3, z: 0.3 },
	{val: 0.69, x: 0.014, y: 0.375, z: 0.3 },
	{val: 0.69, x: 0.016, y: 0.375, z: 0.3 },
	{val: 0.69, x: 0.018, y: 0.375, z: 0.3 },
	{val: 0.69, x: 0.02, y: 0.375, z: 0.3 },
	{val: 0.69, x: 0.022, y: 0.375, z: 0.3 },
	{val: 0.68, x: 0.014, y: 0.45, z: 0.3 },
	{val: 0.68, x: 0.016, y: 0.45, z: 0.3 },
	{val: 0.68, x: 0.018, y: 0.45, z: 0.3 },
	{val: 0.68, x: 0.02, y: 0.45, z: 0.3 },
	{val: 0.68, x: 0.022, y: 0.45, z: 0.3 },
	{val: 0.97, x: 0.014, y: 0.05, z: 0.4 },
	{val: 0.978, x: 0.016, y: 0.05, z: 0.4 },
	{val: 0.985, x: 0.018, y: 0.05, z: 0.4 },
	{val: 0.99, x: 0.02, y: 0.05, z: 0.4 },
	{val: 0.995, x: 0.022, y: 0.05, z: 0.4 },
	{val: 0.965, x: 0.014, y: 0.075, z: 0.4 },
	{val: 0.964, x: 0.016, y: 0.075, z: 0.4 },
	{val: 0.963, x: 0.018, y: 0.075, z: 0.4 },
	{val: 0.962, x: 0.02, y: 0.075, z: 0.4 },
	{val: 0.96, x: 0.022, y: 0.075, z: 0.4 },
	{val: 0.94, x: 0.014, y: 0.1, z: 0.4 },
	{val: 0.94, x: 0.016, y: 0.1, z: 0.4 },
	{val: 0.94, x: 0.018, y: 0.1, z: 0.4 },
	{val: 0.94, x: 0.02, y: 0.1, z: 0.4 },
	{val: 0.94, x: 0.022, y: 0.1, z: 0.4 },
	{val: 0.895, x: 0.014, y: 0.15, z: 0.4 },
	{val: 0.895, x: 0.016, y: 0.15, z: 0.4 },
	{val: 0.895, x: 0.018, y: 0.15, z: 0.4 },
	{val: 0.895, x: 0.02, y: 0.15, z: 0.4 },
	{val: 0.895, x: 0.022, y: 0.15, z: 0.4 },
	{val: 0.86, x: 0.014, y: 0.2, z: 0.4 },
	{val: 0.86, x: 0.016, y: 0.2, z: 0.4 },
	{val: 0.86, x: 0.018, y: 0.2, z: 0.4 },
	{val: 0.86, x: 0.02, y: 0.2, z: 0.4 },
	{val: 0.86, x: 0.022, y: 0.2, z: 0.4 },
	{val: 0.84, x: 0.014, y: 0.225, z: 0.4 },
	{val: 0.84, x: 0.016, y: 0.225, z: 0.4 },
	{val: 0.84, x: 0.018, y: 0.225, z: 0.4 },
	{val: 0.84, x: 0.02, y: 0.225, z: 0.4 },
	{val: 0.84, x: 0.022, y: 0.225, z: 0.4 },
	{val: 0.78, x: 0.014, y: 0.3, z: 0.4 },
	{val: 0.78, x: 0.016, y: 0.3, z: 0.4 },
	{val: 0.78, x: 0.018, y: 0.3, z: 0.4 },
	{val: 0.78, x: 0.02, y: 0.3, z: 0.4 },
	{val: 0.78, x: 0.022, y: 0.3, z: 0.4 },
	{val: 0.76, x: 0.014, y: 0.375, z: 0.4 },
	{val: 0.76, x: 0.016, y: 0.375, z: 0.4 },
	{val: 0.76, x: 0.018, y: 0.375, z: 0.4 },
	{val: 0.76, x: 0.02, y: 0.375, z: 0.4 },
	{val: 0.76, x: 0.022, y: 0.375, z: 0.4 },
	{val: 0.75, x: 0.014, y: 0.45, z: 0.4 },
	{val: 0.75, x: 0.016, y: 0.45, z: 0.4 },
	{val: 0.75, x: 0.018, y: 0.45, z: 0.4 },
	{val: 0.75, x: 0.02, y: 0.45, z: 0.4 },
	{val: 0.75, x: 0.022, y: 0.45, z: 0.4 },
	{val: 0.995, x: 0.014, y: 0.05, z: 0.5 },
	{val: 0.995, x: 0.016, y: 0.05, z: 0.5 },
	{val: 0.995, x: 0.018, y: 0.05, z: 0.5 },
	{val: 0.995, x: 0.02, y: 0.05, z: 0.5 },
	{val: 0.995, x: 0.022, y: 0.05, z: 0.5 },
	{val: 0.979, x: 0.014, y: 0.075, z: 0.5 },
	{val: 0.979, x: 0.016, y: 0.075, z: 0.5 },
	{val: 0.979, x: 0.018, y: 0.075, z: 0.5 },
	{val: 0.979, x: 0.02, y: 0.075, z: 0.5 },
	{val: 0.979, x: 0.022, y: 0.075, z: 0.5 },
	{val: 0.963, x: 0.014, y: 0.1, z: 0.5 },
	{val: 0.963, x: 0.016, y: 0.1, z: 0.5 },
	{val: 0.963, x: 0.018, y: 0.1, z: 0.5 },
	{val: 0.963, x: 0.02, y: 0.1, z: 0.5 },
	{val: 0.963, x: 0.022, y: 0.1, z: 0.5 },
	{val: 0.924, x: 0.014, y: 0.15, z: 0.5 },
	{val: 0.924, x: 0.016, y: 0.15, z: 0.5 },
	{val: 0.924, x: 0.018, y: 0.15, z: 0.5 },
	{val: 0.924, x: 0.02, y: 0.15, z: 0.5 },
	{val: 0.924, x: 0.022, y: 0.15, z: 0.5 },
	{val: 0.894, x: 0.014, y: 0.2, z: 0.5 },
	{val: 0.894, x: 0.016, y: 0.2, z: 0.5 },
	{val: 0.894, x: 0.018, y: 0.2, z: 0.5 },
	{val: 0.894, x: 0.02, y: 0.2, z: 0.5 },
	{val: 0.894, x: 0.022, y: 0.2, z: 0.5 },
	{val: 0.88, x: 0.014, y: 0.225, z: 0.5 },
	{val: 0.88, x: 0.016, y: 0.225, z: 0.5 },
	{val: 0.88, x: 0.018, y: 0.225, z: 0.5 },
	{val: 0.88, x: 0.02, y: 0.225, z: 0.5 },
	{val: 0.88, x: 0.022, y: 0.225, z: 0.5 },
	{val: 0.83, x: 0.014, y: 0.3, z: 0.5 },
	{val: 0.83, x: 0.016, y: 0.3, z: 0.5 },
	{val: 0.83, x: 0.018, y: 0.3, z: 0.5 },
	{val: 0.83, x: 0.02, y: 0.3, z: 0.5 },
	{val: 0.83, x: 0.022, y: 0.3, z: 0.5 },
	{val: 0.815, x: 0.014, y: 0.375, z: 0.5 },
	{val: 0.815, x: 0.016, y: 0.375, z: 0.5 },
	{val: 0.815, x: 0.018, y: 0.375, z: 0.5 },
	{val: 0.815, x: 0.02, y: 0.375, z: 0.5 },
	{val: 0.815, x: 0.022, y: 0.375, z: 0.5 },
	{val: 0.81, x: 0.014, y: 0.45, z: 0.5 },
	{val: 0.81, x: 0.016, y: 0.45, z: 0.5 },
	{val: 0.81, x: 0.018, y: 0.45, z: 0.5 },
	{val: 0.81, x: 0.02, y: 0.45, z: 0.5 },
	{val: 0.81, x: 0.022, y: 0.45, z: 0.5 },
	{val: 0.998, x: 0.014, y: 0.05, z: 0.6 },
	{val: 0.998, x: 0.016, y: 0.05, z: 0.6 },
	{val: 0.998, x: 0.018, y: 0.05, z: 0.6 },
	{val: 0.998, x: 0.02, y: 0.05, z: 0.6 },
	{val: 0.998, x: 0.022, y: 0.05, z: 0.6 },
	{val: 0.984, x: 0.014, y: 0.075, z: 0.6 },
	{val: 0.984, x: 0.016, y: 0.075, z: 0.6 },
	{val: 0.984, x: 0.018, y: 0.075, z: 0.6 },
	{val: 0.984, x: 0.02, y: 0.075, z: 0.6 },
	{val: 0.984, x: 0.022, y: 0.075, z: 0.6 },
	{val: 0.972, x: 0.014, y: 0.1, z: 0.6 },
	{val: 0.972, x: 0.016, y: 0.1, z: 0.6 },
	{val: 0.972, x: 0.018, y: 0.1, z: 0.6 },
	{val: 0.972, x: 0.02, y: 0.1, z: 0.6 },
	{val: 0.972, x: 0.022, y: 0.1, z: 0.6 },
	{val: 0.945, x: 0.014, y: 0.15, z: 0.6 },
	{val: 0.945, x: 0.016, y: 0.15, z: 0.6 },
	{val: 0.945, x: 0.018, y: 0.15, z: 0.6 },
	{val: 0.945, x: 0.02, y: 0.15, z: 0.6 },
	{val: 0.945, x: 0.022, y: 0.15, z: 0.6 },
	{val: 0.921, x: 0.014, y: 0.2, z: 0.6 },
	{val: 0.921, x: 0.016, y: 0.2, z: 0.6 },
	{val: 0.921, x: 0.018, y: 0.2, z: 0.6 },
	{val: 0.921, x: 0.02, y: 0.2, z: 0.6 },
	{val: 0.921, x: 0.022, y: 0.2, z: 0.6 },
	{val: 0.908, x: 0.014, y: 0.225, z: 0.6 },
	{val: 0.908, x: 0.016, y: 0.225, z: 0.6 },
	{val: 0.908, x: 0.018, y: 0.225, z: 0.6 },
	{val: 0.908, x: 0.02, y: 0.225, z: 0.6 },
	{val: 0.908, x: 0.022, y: 0.225, z: 0.6 },
	{val: 0.87, x: 0.014, y: 0.3, z: 0.6 },
	{val: 0.87, x: 0.016, y: 0.3, z: 0.6 },
	{val: 0.87, x: 0.018, y: 0.3, z: 0.6 },
	{val: 0.87, x: 0.02, y: 0.3, z: 0.6 },
	{val: 0.87, x: 0.022, y: 0.3, z: 0.6 },
	{val: 0.86, x: 0.014, y: 0.375, z: 0.6 },
	{val: 0.86, x: 0.016, y: 0.375, z: 0.6 },
	{val: 0.86, x: 0.018, y: 0.375, z: 0.6 },
	{val: 0.86, x: 0.02, y: 0.375, z: 0.6 },
	{val: 0.86, x: 0.022, y: 0.375, z: 0.6 },
	{val: 0.86, x: 0.014, y: 0.45, z: 0.6 },
	{val: 0.86, x: 0.016, y: 0.45, z: 0.6 },
	{val: 0.86, x: 0.018, y: 0.45, z: 0.6 },
	{val: 0.86, x: 0.02, y: 0.45, z: 0.6 },
	{val: 0.86, x: 0.022, y: 0.45, z: 0.6 },
	{val: 1, x: 0.014, y: 0.05, z: 0.7 },
	{val: 1, x: 0.016, y: 0.05, z: 0.7 },
	{val: 1, x: 0.018, y: 0.05, z: 0.7 },
	{val: 1, x: 0.02, y: 0.05, z: 0.7 },
	{val: 1, x: 0.022, y: 0.05, z: 0.7 },
	{val: 0.99, x: 0.014, y: 0.075, z: 0.7 },
	{val: 0.99, x: 0.016, y: 0.075, z: 0.7 },
	{val: 0.99, x: 0.018, y: 0.075, z: 0.7 },
	{val: 0.99, x: 0.02, y: 0.075, z: 0.7 },
	{val: 0.99, x: 0.022, y: 0.075, z: 0.7 },
	{val: 0.98, x: 0.014, y: 0.1, z: 0.7 },
	{val: 0.98, x: 0.016, y: 0.1, z: 0.7 },
	{val: 0.98, x: 0.018, y: 0.1, z: 0.7 },
	{val: 0.98, x: 0.02, y: 0.1, z: 0.7 },
	{val: 0.98, x: 0.022, y: 0.1, z: 0.7 },
	{val: 0.96, x: 0.014, y: 0.15, z: 0.7 },
	{val: 0.96, x: 0.016, y: 0.15, z: 0.7 },
	{val: 0.96, x: 0.018, y: 0.15, z: 0.7 },
	{val: 0.96, x: 0.02, y: 0.15, z: 0.7 },
	{val: 0.96, x: 0.022, y: 0.15, z: 0.7 },
	{val: 0.943, x: 0.014, y: 0.2, z: 0.7 },
	{val: 0.943, x: 0.016, y: 0.2, z: 0.7 },
	{val: 0.943, x: 0.018, y: 0.2, z: 0.7 },
	{val: 0.943, x: 0.02, y: 0.2, z: 0.7 },
	{val: 0.943, x: 0.022, y: 0.2, z: 0.7 },
	{val: 0.934, x: 0.014, y: 0.225, z: 0.7 },
	{val: 0.934, x: 0.016, y: 0.225, z: 0.7 },
	{val: 0.934, x: 0.018, y: 0.225, z: 0.7 },
	{val: 0.934, x: 0.02, y: 0.225, z: 0.7 },
	{val: 0.934, x: 0.022, y: 0.225, z: 0.7 },
	{val: 0.91, x: 0.014, y: 0.3, z: 0.7 },
	{val: 0.91, x: 0.016, y: 0.3, z: 0.7 },
	{val: 0.91, x: 0.018, y: 0.3, z: 0.7 },
	{val: 0.91, x: 0.02, y: 0.3, z: 0.7 },
	{val: 0.91, x: 0.022, y: 0.3, z: 0.7 },
	{val: 0.9, x: 0.014, y: 0.375, z: 0.7 },
	{val: 0.9, x: 0.016, y: 0.375, z: 0.7 },
	{val: 0.9, x: 0.018, y: 0.375, z: 0.7 },
	{val: 0.9, x: 0.02, y: 0.375, z: 0.7 },
	{val: 0.9, x: 0.022, y: 0.375, z: 0.7 },
	{val: 0.9, x: 0.014, y: 0.45, z: 0.7 },
	{val: 0.9, x: 0.016, y: 0.45, z: 0.7 },
	{val: 0.9, x: 0.018, y: 0.45, z: 0.7 },
	{val: 0.9, x: 0.02, y: 0.45, z: 0.7 },
	{val: 0.9, x: 0.022, y: 0.45, z: 0.7 },
	{val: 1, x: 0.014, y: 0.05, z: 0.8 },
	{val: 1, x: 0.016, y: 0.05, z: 0.8 },
	{val: 1, x: 0.018, y: 0.05, z: 0.8 },
	{val: 1, x: 0.02, y: 0.05, z: 0.8 },
	{val: 1, x: 0.022, y: 0.05, z: 0.8 },
	{val: 0.995, x: 0.014, y: 0.075, z: 0.8 },
	{val: 0.995, x: 0.016, y: 0.075, z: 0.8 },
	{val: 0.995, x: 0.018, y: 0.075, z: 0.8 },
	{val: 0.995, x: 0.02, y: 0.075, z: 0.8 },
	{val: 0.995, x: 0.022, y: 0.075, z: 0.8 },
	{val: 0.988, x: 0.014, y: 0.1, z: 0.8 },
	{val: 0.988, x: 0.016, y: 0.1, z: 0.8 },
	{val: 0.988, x: 0.018, y: 0.1, z: 0.8 },
	{val: 0.988, x: 0.02, y: 0.1, z: 0.8 },
	{val: 0.988, x: 0.022, y: 0.1, z: 0.8 },
	{val: 0.974, x: 0.014, y: 0.15, z: 0.8 },
	{val: 0.974, x: 0.016, y: 0.15, z: 0.8 },
	{val: 0.974, x: 0.018, y: 0.15, z: 0.8 },
	{val: 0.974, x: 0.02, y: 0.15, z: 0.8 },
	{val: 0.974, x: 0.022, y: 0.15, z: 0.8 },
	{val: 0.961, x: 0.014, y: 0.2, z: 0.8 },
	{val: 0.961, x: 0.016, y: 0.2, z: 0.8 },
	{val: 0.961, x: 0.018, y: 0.2, z: 0.8 },
	{val: 0.961, x: 0.02, y: 0.2, z: 0.8 },
	{val: 0.961, x: 0.022, y: 0.2, z: 0.8 },
	{val: 0.955, x: 0.014, y: 0.225, z: 0.8 },
	{val: 0.955, x: 0.016, y: 0.225, z: 0.8 },
	{val: 0.955, x: 0.018, y: 0.225, z: 0.8 },
	{val: 0.955, x: 0.02, y: 0.225, z: 0.8 },
	{val: 0.955, x: 0.022, y: 0.225, z: 0.8 },
	{val: 0.94, x: 0.014, y: 0.3, z: 0.8 },
	{val: 0.94, x: 0.016, y: 0.3, z: 0.8 },
	{val: 0.94, x: 0.018, y: 0.3, z: 0.8 },
	{val: 0.94, x: 0.02, y: 0.3, z: 0.8 },
	{val: 0.94, x: 0.022, y: 0.3, z: 0.8 },
	{val: 0.93, x: 0.014, y: 0.375, z: 0.8 },
	{val: 0.93, x: 0.016, y: 0.375, z: 0.8 },
	{val: 0.93, x: 0.018, y: 0.375, z: 0.8 },
	{val: 0.93, x: 0.02, y: 0.375, z: 0.8 },
	{val: 0.93, x: 0.022, y: 0.375, z: 0.8 },
	{val: 0.93, x: 0.014, y: 0.45, z: 0.8 },
	{val: 0.93, x: 0.016, y: 0.45, z: 0.8 },
	{val: 0.93, x: 0.018, y: 0.45, z: 0.8 },
	{val: 0.93, x: 0.02, y: 0.45, z: 0.8 },
	{val: 0.93, x: 0.022, y: 0.45, z: 0.8 },
	{val: 1, x: 0.014, y: 0.05, z: 0.9 },
	{val: 1, x: 0.016, y: 0.05, z: 0.9 },
	{val: 1, x: 0.018, y: 0.05, z: 0.9 },
	{val: 1, x: 0.02, y: 0.05, z: 0.9 },
	{val: 1, x: 0.022, y: 0.05, z: 0.9 },
	{val: 0.998, x: 0.014, y: 0.075, z: 0.9 },
	{val: 0.998, x: 0.016, y: 0.075, z: 0.9 },
	{val: 0.998, x: 0.018, y: 0.075, z: 0.9 },
	{val: 0.998, x: 0.02, y: 0.075, z: 0.9 },
	{val: 0.998, x: 0.022, y: 0.075, z: 0.9 },
	{val: 0.995, x: 0.014, y: 0.1, z: 0.9 },
	{val: 0.995, x: 0.016, y: 0.1, z: 0.9 },
	{val: 0.995, x: 0.018, y: 0.1, z: 0.9 },
	{val: 0.995, x: 0.02, y: 0.1, z: 0.9 },
	{val: 0.995, x: 0.022, y: 0.1, z: 0.9 },
	{val: 0.99, x: 0.014, y: 0.15, z: 0.9 },
	{val: 0.99, x: 0.016, y: 0.15, z: 0.9 },
	{val: 0.99, x: 0.018, y: 0.15, z: 0.9 },
	{val: 0.99, x: 0.02, y: 0.15, z: 0.9 },
	{val: 0.99, x: 0.022, y: 0.15, z: 0.9 },
	{val: 0.98, x: 0.014, y: 0.2, z: 0.9 },
	{val: 0.98, x: 0.016, y: 0.2, z: 0.9 },
	{val: 0.98, x: 0.018, y: 0.2, z: 0.9 },
	{val: 0.98, x: 0.02, y: 0.2, z: 0.9 },
	{val: 0.98, x: 0.022, y: 0.2, z: 0.9 },
	{val: 0.975, x: 0.014, y: 0.225, z: 0.9 },
	{val: 0.975, x: 0.016, y: 0.225, z: 0.9 },
	{val: 0.975, x: 0.018, y: 0.225, z: 0.9 },
	{val: 0.975, x: 0.02, y: 0.225, z: 0.9 },
	{val: 0.975, x: 0.022, y: 0.225, z: 0.9 },
	{val: 0.97, x: 0.014, y: 0.3, z: 0.9 },
	{val: 0.97, x: 0.016, y: 0.3, z: 0.9 },
	{val: 0.97, x: 0.018, y: 0.3, z: 0.9 },
	{val: 0.97, x: 0.02, y: 0.3, z: 0.9 },
	{val: 0.97, x: 0.022, y: 0.3, z: 0.9 },
	{val: 0.97, x: 0.014, y: 0.375, z: 0.9 },
	{val: 0.97, x: 0.016, y: 0.375, z: 0.9 },
	{val: 0.97, x: 0.018, y: 0.375, z: 0.9 },
	{val: 0.97, x: 0.02, y: 0.375, z: 0.9 },
	{val: 0.97, x: 0.022, y: 0.375, z: 0.9 },
	{val: 0.97, x: 0.014, y: 0.45, z: 0.9 },
	{val: 0.97, x: 0.016, y: 0.45, z: 0.9 },
	{val: 0.97, x: 0.018, y: 0.45, z: 0.9 },
	{val: 0.97, x: 0.02, y: 0.45, z: 0.9 },
	{val: 0.97, x: 0.022, y: 0.45, z: 0.9 },
	{val: 1, x: 0.014, y: 0.05, z: 1 },
	{val: 1, x: 0.016, y: 0.05, z: 1 },
	{val: 1, x: 0.018, y: 0.05, z: 1 },
	{val: 1, x: 0.02, y: 0.05, z: 1 },
	{val: 1, x: 0.022, y: 0.05, z: 1 },
	{val: 1, x: 0.014, y: 0.075, z: 1 },
	{val: 1, x: 0.016, y: 0.075, z: 1 },
	{val: 1, x: 0.018, y: 0.075, z: 1 },
	{val: 1, x: 0.02, y: 0.075, z: 1 },
	{val: 1, x: 0.022, y: 0.075, z: 1 },
	{val: 1, x: 0.014, y: 0.1, z: 1 },
	{val: 1, x: 0.016, y: 0.1, z: 1 },
	{val: 1, x: 0.018, y: 0.1, z: 1 },
	{val: 1, x: 0.02, y: 0.1, z: 1 },
	{val: 1, x: 0.022, y: 0.1, z: 1 },
	{val: 1, x: 0.014, y: 0.15, z: 1 },
	{val: 1, x: 0.016, y: 0.15, z: 1 },
	{val: 1, x: 0.018, y: 0.15, z: 1 },
	{val: 1, x: 0.02, y: 0.15, z: 1 },
	{val: 1, x: 0.022, y: 0.15, z: 1 },
	{val: 1, x: 0.014, y: 0.2, z: 1 },
	{val: 1, x: 0.016, y: 0.2, z: 1 },
	{val: 1, x: 0.018, y: 0.2, z: 1 },
	{val: 1, x: 0.02, y: 0.2, z: 1 },
	{val: 1, x: 0.022, y: 0.2, z: 1 },
	{val: 1, x: 0.014, y: 0.225, z: 1 },
	{val: 1, x: 0.016, y: 0.225, z: 1 },
	{val: 1, x: 0.018, y: 0.225, z: 1 },
	{val: 1, x: 0.02, y: 0.225, z: 1 },
	{val: 1, x: 0.022, y: 0.225, z: 1 },
	{val: 1, x: 0.014, y: 0.3, z: 1 },
	{val: 1, x: 0.016, y: 0.3, z: 1 },
	{val: 1, x: 0.018, y: 0.3, z: 1 },
	{val: 1, x: 0.02, y: 0.3, z: 1 },
	{val: 1, x: 0.022, y: 0.3, z: 1 },
	{val: 1, x: 0.014, y: 0.375, z: 1 },
	{val: 1, x: 0.016, y: 0.375, z: 1 },
	{val: 1, x: 0.018, y: 0.375, z: 1 },
	{val: 1, x: 0.02, y: 0.375, z: 1 },
	{val: 1, x: 0.022, y: 0.375, z: 1 },
	{val: 1, x: 0.014, y: 0.45, z: 1 },
	{val: 1, x: 0.016, y: 0.45, z: 1 },
	{val: 1, x: 0.018, y: 0.45, z: 1 },
	{val: 1, x: 0.02, y: 0.45, z: 1 },
	{val: 1, x: 0.022, y: 0.45, z: 1 },
	{val: 1, x: 0.014, y: 0.05, z: 10000 },
	{val: 1, x: 0.016, y: 0.05, z: 10000 },
	{val: 1, x: 0.018, y: 0.05, z: 10000 },
	{val: 1, x: 0.02, y: 0.05, z: 10000 },
	{val: 1, x: 0.022, y: 0.05, z: 10000 },
	{val: 1.01, x: 0.014, y: 0.075, z: 10000 },
	{val: 1.01, x: 0.016, y: 0.075, z: 10000 },
	{val: 1.01, x: 0.018, y: 0.075, z: 10000 },
	{val: 1.01, x: 0.02, y: 0.075, z: 10000 },
	{val: 1.01, x: 0.022, y: 0.075, z: 10000 },
	{val: 1.02, x: 0.014, y: 0.1, z: 10000 },
	{val: 1.02, x: 0.016, y: 0.1, z: 10000 },
	{val: 1.02, x: 0.018, y: 0.1, z: 10000 },
	{val: 1.02, x: 0.02, y: 0.1, z: 10000 },
	{val: 1.02, x: 0.022, y: 0.1, z: 10000 },
	{val: 1.04, x: 0.014, y: 0.15, z: 10000 },
	{val: 1.04, x: 0.016, y: 0.15, z: 10000 },
	{val: 1.04, x: 0.018, y: 0.15, z: 10000 },
	{val: 1.04, x: 0.02, y: 0.15, z: 10000 },
	{val: 1.04, x: 0.022, y: 0.15, z: 10000 },
	{val: 1.06, x: 0.014, y: 0.2, z: 10000 },
	{val: 1.06, x: 0.016, y: 0.2, z: 10000 },
	{val: 1.06, x: 0.018, y: 0.2, z: 10000 },
	{val: 1.06, x: 0.02, y: 0.2, z: 10000 },
	{val: 1.06, x: 0.022, y: 0.2, z: 10000 },
	{val: 1.07, x: 0.014, y: 0.225, z: 10000 },
	{val: 1.07, x: 0.016, y: 0.225, z: 10000 },
	{val: 1.07, x: 0.018, y: 0.225, z: 10000 },
	{val: 1.07, x: 0.02, y: 0.225, z: 10000 },
	{val: 1.07, x: 0.022, y: 0.225, z: 10000 },
	{val: 1.09, x: 0.014, y: 0.3, z: 10000 },
	{val: 1.09, x: 0.016, y: 0.3, z: 10000 },
	{val: 1.09, x: 0.018, y: 0.3, z: 10000 },
	{val: 1.09, x: 0.02, y: 0.3, z: 10000 },
	{val: 1.09, x: 0.022, y: 0.3, z: 10000 },
	{val: 1.1, x: 0.014, y: 0.375, z: 10000 },
	{val: 1.1, x: 0.016, y: 0.375, z: 10000 },
	{val: 1.1, x: 0.018, y: 0.375, z: 10000 },
	{val: 1.1, x: 0.02, y: 0.375, z: 10000 },
	{val: 1.1, x: 0.022, y: 0.375, z: 10000 },
	{val: 1.1, x: 0.014, y: 0.45, z: 10000 },
	{val: 1.1, x: 0.016, y: 0.45, z: 10000 },
	{val: 1.1, x: 0.018, y: 0.45, z: 10000 },
	{val: 1.1, x: 0.02, y: 0.45, z: 10000 },
	{val: 1.1, x: 0.022, y: 0.45, z: 10000 },
	],
	tableA9 : [
		{val: 1, x: 0.05},
		{val: 0.99, x: 0.075},
		{val: 0.98, x: 0.10},
		{val: 0.95, x: 0.15},
		{val: 0.92, x: 0.2},
		{val: 0.9, x: 0.225},
		{val: 0.82, x: 0.3},
		{val: 0.72, x: 0.375},
		{val: 0.6, x: 0.45},
	],	

}


export function polynom(terms, x){
	let result = 0;
	for (let i = terms.length - 1; i >= 0; i--) {
		if (i === 0) {
			result += terms[i];
			} else {
			result += terms[i] * Math.pow(x, i);
		}
	}
	return result;
}


export function drawRuler(scales,values) {
	//console.log(scales,values)
	var ConnectionLine = [];
	var points = []
	var pos_y, pos_x
	var scale, val, j,k,m,n
	// calculate for each object in scales a point on screen
	// if value = 'auto' then point y as mean of y following points. This is needed, as then scales are spreaded in y direction
	n = scales.length
	j=0
	for (var i=0; i< n; i++){
		scale = JSON.parse(JSON.stringify(scales[i]))
		val = values[i]
		if ( val === 'auto' ){ m = i + 1 }
		switch (String(scale.xType)) {
			case "inverse" :
				pos_x = scale.m  * ( 1 /  val ) + scale.n
				break;
			case 'linear' :
				pos_x = scale.m  * val + scale.n
				break;
			case "lookup" :
				pos_x = tableLookup( val , scale.table , 'x' )
				break;
			case "constant" :
				pos_x = scale.n
				break;
			case "inversePower2" :
				pos_x = scale.m  * ( 1 /  Math.pow(val,2) ) + scale.n
				break;
			case "logarithmic" :
				pos_x = scale.m * Math.log10(val) + scale.n
				break;
			case 'exponent' :
				pos_x = scale.m * Math.pow( val , scale.n)
				break;
			case 'polynom' :
				pos_x = polynom(scale.m, val)
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.xType)
		}
		points[j] = pos_x
		j++
		switch (String(scale.type)) {
			case "logarithmic" :
				pos_y = scale.p * Math.log10( val ) + scale.q 
				break;
			case "linear" :
				pos_y = scale.p * val + scale.q 
				break;
			case "lookup" :
				pos_y = tableLookup( val , scale.table , 'y' )
				break;
			case 'exponent' :
				pos_y = scale.p * Math.pow ( val , scale.q )
				break;
			case 'polynom' :
				pos_y = polynom(scale.p, val)
				break;
			case 'sqrt' :
				pos_y = scale.p * Math.pow ( val , 0.5 ) + scale.q
				break;
			case 'quadratic' :
				pos_y = scale.p * Math.pow ( val , 2 ) + scale.q
				break;
			case 'qubic' :
				pos_y = scale.p * Math.pow ( val , 3 ) + scale.q
				break;
			default :
				console.log('WARNING: This type not defined. Actual type: ' + scale.type)
		}
		points[j] = pos_y
		j++
	}
	
	j=0
	for ( i=0; i< n; i++){
		scale = JSON.parse(JSON.stringify(scales[i]))
		val = values[i]
		if( val === 'auto' ){
			points[j] =  scale.n
			j++
			pos_y = 0
			for ( k = m ; k < n ; k++){
				pos_y = pos_y + points[2 * k + 1]
			}
			points[j] = pos_y / ( n - m )
			j++
			} else {
			j = j + 2
		}
	}
	
	pos_x = points[0]
	pos_y = points[1]
	
	n = points.length
	
	for ( i=0; i<n; i = i + 2){
		points[i] = points[i] - pos_x
		}
	for ( i=1; i<n; i = i + 2){
		points[i] = points[i] - pos_y
		}


  ConnectionLine = {
    x: pos_x,
    y: pos_y,
    points: points,
    stroke: "red",
    strokeWidth: stat.userSettings.strokeWidth * window.innerWidth * 2,
    tension: 0
  };
  
  return ( [ConnectionLine] ); // returns the values of connection line, where the line goes through!

}

export function moveScale(scale,x,y){
	var dx,dy
	if ( typeof(x) === 'number' ){	dx = x } else { dx = 0 }
	if ( typeof(y) === 'number' ){	dy = y } else { dy = 0 }
	
	if (typeof(scale.q) === 'number' ){scale.q = scale.q + dy * window.innerHeight}
	if (typeof(scale.n) === 'number' ){scale.n = scale.n + dx * window.innerWidth}
	if (typeof(scale.table) === 'object' ){
		//console.log(scale.table)
		var length = Object.keys(scale.table).length
		for (var i = 0; i < length; i++){
			scale.table[i].x = scale.table[i].x + dx * window.innerWidth
			scale.table[i].y = scale.table[i].y + dy * window.innerHeight
		}
	}
}



export function points2intersection(points){
	//points is an array of x and y coordinates [{x: , y: },{},...]
	//the function calculate lines from points 1,2 and 3,4 and returns intersection of these two lines.
	var m = [], t = [], x, y
	//console.log(points)

	if ( points[0].x !== points[1].x && points[2].x !== points[3].x){
		m[0] = ( points[1].y - points[0].y )/(points[1].x - points[0].x)
		m[1] = ( points[3].y - points[2].y )/(points[3].x - points[2].x)
		t[0] = points[0].y - ( points[1].y - points[0].y )/(points[1].x - points[0].x) * points[0].x
		t[1] = points[2].y - ( points[3].y - points[2].y )/(points[3].x - points[2].x) * points[2].x
		x = ( t[1] - t[0] )/( m[0] - m[1] )
		y = m[0] * x + t[0]		
	}
	
	if ( points[0].x !== points[1].x && points[2].x === points[3].x){
		x = points[2].x
		m[0] = ( points[1].y - points[0].y )/(points[1].x - points[0].x)
		t[0] = points[0].y - ( points[1].y - points[0].y )/(points[1].x - points[0].x) * points[0].x
		y = m[0] * x + t[0]
	}

	if ( points[0].x === points[1].x && points[2].x !== points[3].x){
		console.log('WARNING! no math until now');
	}
	
	//console.log(m,t,x,y)
	return { x:x , y:y }
	}

export function value2pos(scaleProps, value){
	// takes a object and value as parameter.
	// returns according y-coordinate as pct. of screen
	var y
	switch (String(scaleProps.type)){
		case 'linear':
			y=scaleProps.p * value + scaleProps.q
			break;
		case 'logarithmic':
			y=scaleProps.p * Math.log10(value) + scaleProps.q 
			break;
		case 'sqrt':
			y=scaleProps.p * Math.pow(value, 0.5) + scaleProps.q 
			break;
		case 'quadratic':
			y=scaleProps.p * Math.pow(value, 2) + scaleProps.q 
			break;
		case 'qubic':
			y=scaleProps.p * Math.pow(value, 3) + scaleProps.q 
			break;
		default :
			console.log('WARNING: This type not defined. Actual type: ' + scaleProps.type)		
	}

	return y
	}

export function pos2value(scaleProps, position){
	//if scale is manual and p/q not existing, then calculate p/q first
	// if scale is manual, no curved scale possible


	var val

	switch (String(scaleProps.type)){
		case 'linear':
			val = ( position - scaleProps.q ) / scaleProps.p			
			break;
		case 'logarithmic':
			val = Math.pow(10,(position - scaleProps.q ) / scaleProps.p )
			break;
		case 'sqrt':
			val = Math.pow( (position / scaleProps.p) - (scaleProps.q / scaleProps.p), 2 )
			break;
		case 'quadratic':
			val = Math.pow( (position / scaleProps.p) - (scaleProps.q / scaleProps.p), 0.5 )
			break;
		case 'qubic':
			val = Math.pow( (position / scaleProps.p) - (scaleProps.q / scaleProps.p), (1/3) )
			break;
		default :
			console.log('WARNING: This type not defined. Actual type: ' + scaleProps.type)		
	}

		return val
	}
	
export function minMax2parameter(scaleProps, min, max){
	var y_min, y_max, x_min, x_max, p, q, m, n
	
	if (scaleProps.reverse === false){
			y_min=scaleProps.positionY * window.innerHeight
			y_max=(scaleProps.positionY + scaleProps.height) * window.innerHeight
			x_min=scaleProps.positionX * window.innerWidth
			x_max=(scaleProps.positionX + scaleProps.width) * window.innerWidth
		}
	if (scaleProps.reverse === true){
			y_min=(scaleProps.positionY + scaleProps.height) * window.innerHeight
			y_max=scaleProps.positionY * window.innerHeight
			x_min=(scaleProps.positionX + scaleProps.width) * window.innerWidth
			x_max=scaleProps.positionX * window.innerWidth
		}

	switch (String(scaleProps.type)){
		case 'linear':
			p=(y_min - y_max) / (min - max)
			q=y_max - p * max		
			break;
		case 'logarithmic':
			p=(y_min - y_max) / (Math.log10(min) - Math.log10(max))
			q=y_max - p * Math.log10(max)
			break;
		case 'quadratic':
			p=(y_min - y_max) / (Math.pow(min,2) - Math.pow(max,2))
			q=y_max - p * Math.pow(max,2);
			break;
		case 'qubic':
			p=(y_min - y_max) / (Math.pow(min,3) - Math.pow(max,3))
			q=y_max - p * Math.pow(max,3);
			break;
		case 'sqrt':
			p=(y_min - y_max) / (Math.pow(min,0.5) - Math.pow(max,0.5))
			q=y_max - p * Math.pow(max,0.5);
			break;
		default :
			console.log('WARNING: This type not defined. Actual type: ' + scaleProps.type)		
	}
	
		switch (String(scaleProps.xType)){
		case 'const':
			m=0
			n=x_min
			break;
		case 'linear':
			m=(x_min - x_max) / (min - max)
			n=x_max - m * max		
			break;
		case 'logarithmic':
			m=(x_min - x_max) / (Math.log10(min) - Math.log10(max))
			n=x_max - m * Math.log10(max)
			break;
		case 'quadratic':
			m=(x_min - x_max) / (Math.pow(min,2) - Math.pow(max,2))
			n=x_max - m * Math.pow(max,2);
			break;
		case 'qubic':
			m=(x_min - x_max) / (Math.pow(min,3) - Math.pow(max,3))
			n=x_max - m * Math.pow(max,3);
			break;
		case 'sqrt':
			m=(x_min - x_max) / (Math.pow(min,0.5) - Math.pow(max,0.5))
			n=x_max - m * Math.pow(max,0.5);
			break;
		default :
			console.log('WARNING: This type not defined. Actual type: ' + scaleProps.xType)		
	}

		return { p : p, q : q, m : m, n : n }
	}

export function parameter2minMax(scaleProps, p, q){
	
	var y_min, y_max, min, max
	
	if (scaleProps.reverse === false){
			y_min=scaleProps.positionY * window.innerHeight
			y_max=(scaleProps.positionY + scaleProps.height) * window.innerHeight
		}
	if (scaleProps.reverse === true){
		y_min=(scaleProps.positionY + scaleProps.height) * window.innerHeight
		y_max=scaleProps.positionY * window.innerHeight
		}


	switch (String(scaleProps.type)){
		case 'logarithmic':
			min=Math.pow(10,( y_min - q) / p)
			max=Math.pow(10,( y_max - q) / p)
			break;
		default :
			console.log('WARNING: This type not defined. Actual type: ' + scaleProps.type)		
	}
	
	return { min: min , max : max }
	}

function points2parameterErrorCheck(type, points){
	//console.log(points)
	var i , p, q
	var n=Object.keys(points).length

	switch ( String(type)) {
		case "constant" :
			p = 0
			q = points[n-1].Sy / n
		break;

		case "exponent" :
			q=(n * points[n-1].Syfx - points[n-1].Sy * points[n-1].Sfx) /  ( n * points[n-1].Sfx2 - Math.pow(points[n-1].Sfx,2))
			p=(points[n-1].Sy - q * points[n-1].Sfx ) / n
			p = Math.exp(p)
		break;

		default :
			p=(n * points[n-1].Syfx - points[n-1].Sy * points[n-1].Sfx) /  ( n * points[n-1].Sfx2 - Math.pow(points[n-1].Sfx,2))
			q=(points[n-1].Sy - p * points[n-1].Sfx ) / n
	}
	//calculate mean value
	//console.log(p,q)
	points.mean=0
	for ( i=0; i<n; i++ ){
		points.mean = points.mean + points[i].y
	}
	points.mean = points.mean / n


	var maxErr=0
	for ( i=0; i<n; i++ ){
		if (type === 'inverse'){ points[i].yInterpol = p * ( 1 / points[i].val) + q }
		if (type === 'logarithmic'){ points[i].yInterpol = p * Math.log10( points[i].val) + q }
		if (type === 'arctan'){ points[i].yInterpol = p * Math.atan( points[i].val) + q }
		if (type === 'inversePower2'){ points[i].yInterpol = p * ( -1 / Math.pow( points[i].val, 2 )) + q }
		if (type === 'inversePower05'){ points[i].yInterpol = p * ( -1 / Math.pow( points[i].val, 0.5 )) + q }
		if (type === 'linear'){	points[i].yInterpol = p * ( points[i].val) + q }
		if (type === 'constant'){ points[i].yInterpol =  q }
		if (type === 'exponent'){points[i].yInterpol = p * Math.pow( points[i].val , q) }
		// sr = square residual, st = square total, ssr = sum of square residual, sst = sum of square total
		points[i].sr = Math.pow(points[i].y - points[i].yInterpol , 2)
		points[i].st = Math.pow(points[i].y - points.mean , 2)
		
		if ( i > 0 ){
			points[i].ssr = points[i-1].ssr + points[i].sr
			points[i].sst = points[i-1].sst + points[i].st
		} else {
			points[i].ssr = points[i].sr
			points[i].sst = points[i].st
		}
		
		if ( i === 0 && Math.abs(points[i].err) > 0 ){ maxErr = points[i].err }
		if ( i > 0 && Math.abs(points[i].err) > maxErr.err) { maxErr = points[i].err }
	}
	//console.log(points)
	points.r2 = 1 - ( points[n-1].ssr / points[n-1].sst )
/*
	if ( points.r2 < 0.9 ){
		console.log('WARNING! coefficient of determination is: ' + niceRounding( points.r2 * 100) + ' %')
	}	
*/	
	return points.r2
}

function myDelete(array,key){
	var n, i
	//this function deletes the object with name "key" from array and closes the gap
	
	n=Object.keys(array).length
	
	//console.log(JSON.stringify(array,null,2))
	for ( i=0; i < n ; i++){
		if ( i >= key ){
			//console.log(i)
			array[i] = array[i+1]
		}
	}
	delete array[n]
	//console.log(JSON.stringify(array,null,2))
}

export function points2parameter(input){
	//points should be an array of minimum 2 points. If more points are given, the Errorsum is also returned!
	//for testing, a manual array of points is given.
	// points should be an array of objects: [{ y: , val: },{},...]
	// for info about math: search "Least Squares Fitting"  --> "https://mathworld.wolfram.com/LeastSquaresFittingLogarithmic.html"
	// type is one of: inverse, logarithmic, arctan, inversePower2, linear
	// filter is the amount of points to filter out.
	//console.log(type, points, filter)
	var type = input.type
	var points = input.table
	var degree = input.degree


	var p,q, r2, n, i,j
	var pList = []
	var poly

	
	if (type === 'polynom' ){
		var length=Object.keys(points).length
		for (i = 0; i < length ; i++){
			pList[i] = {x: points[i].val, y:points[i].y }
		}		
		//console.log(pList,degree)
		poly = PolynomialRegression.read(pList, degree);
	}


	if (type === 'constant' ){
		n=Object.keys(points).length
		for ( i=0; i<n; i++){
			if ( i > 0 ){
				points[i].Sy = points[i-1].Sy + points[i].y
				}	else {
				points[i].Sy = points[i].y
			}
		}
	}
	
	if (type === 'inverse'){
		n=Object.keys(points).length
		for ( i=0; i<n; i++){
			points[i].yfx = points[i].y * 1 / points[i].val
			points[i].fx = 1 / points[i].val
			points[i].fx2 = ( 1 / points[i].val ) * ( 1 / points[i].val )
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].y
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				} else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].y
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2
				}
			}
		}
	
	if (type === 'logarithmic'){
		n=Object.keys(points).length
		//console.log(JSON.stringify(points,null,2))
		j=0
		for ( i=0; i<n; i++){
			if ( points[i].val > 0 ){
				//console.log(points[i].val)
				points[j].y = points[i].y
				points[j].val = points[i].val
				j++
			} 
		}

		for ( i=0; i<n; i++){
			points[i].yfx = points[i].y * Math.log10(points[i].val)
			points[i].fx = Math.log10(points[i].val)
			points[i].fx2 = Math.log10(points[i].val) * Math.log10(points[i].val)
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].y
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				}	else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].y
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2

				}
			}
		//console.log(points)
	}

	if (type === 'arctan'){
		n=Object.keys(points).length
		for ( i=0; i<n; i++){
			points[i].yfx = points[i].y * Math.atan(points[i].val)
			points[i].fx = Math.atan(points[i].val)
			points[i].fx2 = Math.atan(points[i].val) * Math.atan(points[i].val)
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].y
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				}	else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].y
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2

				}
			}

		}


	if (type === 'inversePower2'){
		n=Object.keys(points).length
		for ( i=0; i<n; i++){
			points[i].yfx = points[i].y * ( 1 / Math.pow(points[i].val , 2 ) )
			points[i].fx = ( 1 / Math.pow(points[i].val , 2 ) )
			points[i].fx2 = ( 1 / Math.pow(points[i].val , 2 ) ) * ( 1 / Math.pow(points[i].val , 2 ) )
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].y
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				}	else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].y
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2

			}
		}

	}


	if (type === 'polynom2' ){
		
	}


	if (type === 'exponent' ){
		// add here type power  y = p * val^q
		// first: logarithmic conversion:   ln(y) = ln(p) + q * ln(val)
		// points[i].y --> Math.log(points[i].y)
		// points[i].val --> Math.log(points[i].val)
		// then linear regression
		// then convert p back
		n=Object.keys(points).length
		
		for ( i=0; i<n; i++){
			points[i].lnVal = Math.log(points[i].val)
			points[i].lnY = Math.log(points[i].y)
		}
		
		
		for ( i=0; i<n; i++){
			points[i].yfx = points[i].lnY * points[i].lnVal
			points[i].fx = points[i].lnVal
			points[i].fx2 = points[i].lnVal * points[i].lnVal
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].lnY
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				}	else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].lnY
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2
			}
		}
		
	}


	if (type === 'linear'){
		//console.log(JSON.stringify(points,null,2))
		n=Object.keys(points).length
		for ( i=0; i<n; i++){
			points[i].yfx = points[i].y * points[i].val
			points[i].fx = points[i].val
			points[i].fx2 = points[i].val * points[i].val
			if ( i > 0 ){
				points[i].Syfx = points[i-1].Syfx + points[i].yfx
				points[i].Sy = points[i-1].Sy + points[i].y
				points[i].Sfx = points[i-1].Sfx + points[i].fx
				points[i].Sfx2 = points[i-1].Sfx2 + points[i].fx2
				}	else {
				points[i].Syfx = points[i].yfx
				points[i].Sy = points[i].y
				points[i].Sfx = points[i].fx
				points[i].Sfx2 = points[i].fx2
			}
		}
	
	}


	switch ( String(type)) {
		case "constant" :
			p = 0
			q = points[n-1].Sy / n
		break;

		case "exponent" :
			q=(n * points[n-1].Syfx - points[n-1].Sy * points[n-1].Sfx) /  ( n * points[n-1].Sfx2 - Math.pow(points[n-1].Sfx,2))
			p=(points[n-1].Sy - q * points[n-1].Sfx ) / n
			p = Math.exp(p)
		break;

		case "polynom" :
			p = poly.getTerms()
			//console.log(JSON.stringify(p))
			q = p
		break;

		default :
			p=(n * points[n-1].Syfx - points[n-1].Sy * points[n-1].Sfx) /  ( n * points[n-1].Sfx2 - Math.pow(points[n-1].Sfx,2))
			q=(points[n-1].Sy - p * points[n-1].Sfx ) / n
	}
	
	if ( type.slice(0,7) !== 'polynom' ){
		r2 = points2parameterErrorCheck(type,points)	
	}

	//console.log(p,q,r2)

		
	return { p : p , q : q , r2: r2}
	}

export function toSiUnits(value, unit) {
	var factor
	
	switch (String(unit)) {		
		case "kW" : factor = 1000; break;
		case "l/min": factor = 60 / 3.6e6; break;
		case "l/s": factor = 0.001; break;
		case "l/h": factor = 1 / 3.6e6; break;
		case "m³/h": factor = 1 / 3.6e3; break;
		case "m³/s": factor = 1; break;

		case "mm": factor = 0.001; break;
		case "cm": factor = 0.01; break;
		case "m": factor = 1; break;
		case "ft": factor = 0.3048; break;
		case "in": factor = 0.0254; break;

		case "m/s": factor = 1; break;

		case "m²": factor = 1; break

		case "N/m²": factor = 1; break;
		case "Pa": factor = 1; break;
		case "hPa": factor = 100; break;
		case "kPa": factor = 1000; break;		
		case "bar": factor = 100000; break;
		case "psi": factor = 6894.76; break;
		case "mmHg": factor = 133.322; break;

		case "kg": factor = 1; break;
		case "lbs": factor = 0.453592; break;
		case "g": factor = 0.001; break;
		case "daN": factor = 1.019716213; break;
		case "t": factor = 1000; break;


		case "ml" : factor = 0.000001; break;		
		case "l" : factor = 0.001; break;
		case "hl" : factor = 0.1; break;
		case "m³" : factor = 1; break;
		
		
		case "min" : factor = 60; break;
		case "h" : factor = 3600; break;
		
		case "°C" : factor = 1; break;
		case "K/W" : factor = 1; break;
		
		case "W/m²" : factor = 1; break;
		
		case "W/m²K" : factor = 1; break;

		default: 
			factor = 1
			console.log('WARNING: Unknown unit: ' + unit);
	}
	return value * factor;
}

export function niceRounding(value){
	var cbValue
	// choose according rounding method.
	if ( value >= 0 && value < 0.1 ){ cbValue = value.toPrecision(1) }
	if ( value >= 0.1 && value < 1 ){ cbValue = value.toPrecision(2) }
	if ( value >= 1 && value < 10 ){ cbValue = value.toPrecision(2) }
	if ( value >= 10 && value < 100 ){ cbValue = value.toPrecision(2) }
	if ( value >= 100 ){ cbValue = value.toFixed(0) }
	return cbValue
	}

export function toUserUnits(value, unit) {
	var factor
  factor = toSiUnits(1, unit);
  return value / factor;
}

export function interpolate(x1, y1, x2, y2, x) {
	var t, y, m
	if ( x1 === x2 && x1 === x ){
		y = (y1 + y2) / 2
	} else {
		//gives linear interpolated value back. could not find such simple in math.js.
		m = (y2 - y1) / (x2 - x1);
		t = y1 - m * x1;
		y = m * x + t;
	}
  return y;
}


function pressureDrop(sim){

	sim.velocity = sim.flowRate / (Math.PI * sim.diameter * sim.diameter * 0.25)
	sim.rho = brine( stat.userInput.pipeCalculation.brineType, 'rho', stat.userInput.pipeCalculation.temperature, userInput.pipeCalculation.brineRatio);		
	sim.cp = brine( stat.userInput.pipeCalculation.brineType, 'cp', stat.userInput.pipeCalculation.temperature, userInput.pipeCalculation.brineRatio);		
	sim.k = stat.userInput.pipeCalculation.roughness;
	sim.my = brine( stat.userInput.pipeCalculation.brineType, 'my', stat.userInput.pipeCalculation.temperature, userInput.pipeCalculation.brineRatio );
	sim.Re = (sim.rho * sim.velocity * sim.diameter) / sim.my;
	//calculate lambda with Haaland
	sim.lambda=Math.pow( 1 / (-1.8 * Math.log10(( 6.9 / sim.Re ) +  Math.pow((sim.k/(sim.diameter*1000))/3.71, 1.11))), 2);
	sim.pressureDrop  = sim.lambda * ( sim.length / sim.diameter) * (1/2 ) * sim.rho * Math.pow(sim.velocity, 2); // Pa
	sim.power = sim.flowRate * sim.cp * sim.rho * sim.deltaTemp
	return sim
}


export function pipeCalculation(input) {
	var lookback = []


	var sim = {}
	//given data in input has to be in Si units !!
	if ( input.verboseLevel > 1 ){	console.log(input) }

	if (typeof(input.scaleDiameter) === 'number' && typeof(input.scalePipeLength) === 'number'){
		if (input.calcType === 'pipeCalculation_volume'){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'						
			sim.pipeDiameter = input.scaleDiameter
			sim.pipeLength = input.scalePipeLength
			sim.pipeVolume = Math.PI * Math.pow( sim.pipeDiameter , 2 ) * 0.25 * sim.pipeLength
		}
	}

	if (typeof(input.scaleDiameter) === 'number' && typeof(input.scaleVolume) === 'number'){
		if (input.calcType === 'pipeCalculation_volume'){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'						
			sim.pipeDiameter = input.scaleDiameter
			sim.pipeVolume = input.scaleVolume
			sim.pipeLength = sim.pipeVolume / ( Math.PI * Math.pow( sim.pipeDiameter , 2 ) * 0.25 )
		}
	}



	if (typeof(input.scaleDiameter) === 'number' && typeof(input.scalePressureDrop) === 'number'){
		if (input.calcType === 'pipeCalculation_pressureDrop'){
			//calculate flowRate based on Pressure Drop
			// keep diameter and vary flowRate to find pressureDrop!!
			sim.verboseLevel = input.verboseLevel
			sim.diameter = input.scaleDiameter
			sim.pressureDrop = input.scalePressureDrop
			sim.flowRate = input.startvalue
//			sim.length = stat.userInput.pipeCalculation.pipeLength
			sim.length = stat.userInput.pipeCalculation.pipeLength

			sim = pressureDrop(sim);
			
			sim.error = ( sim.pressureDrop - input.scalePressureDrop )/ input.scalePressureDrop
			
			if (sim.error > 0 ){
				sim.sf = input.startvalue * 0.2
				} else { sim.sf = input.startvalue * -0.2 
			}
			sim.counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error > 0 ){
					sim.flowRate = sim.flowRate + sim.sf
					} else {
					sim.flowRate = sim.flowRate - sim.sf
				}
				
				
			sim = pressureDrop(sim);
			sim.error = ( sim.pressureDrop - input.scalePressureDrop )/ input.scalePressureDrop
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sim.sf = sim.sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sim.sf = sim.sf * -0.5
					}

					if ( sim.flowRate <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.status2 = 'flowRate < 0'
						sim.status = 'error'
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.00001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.status2 = 'minimum error reached!'
						sim.status = 'success'
						sim.cancel = true 
					}

					if ( sim.counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3')
						}
						sim.status2 = 'maximum counter reached'
						sim.status = 'error'
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(sim.counter, sim.sf, sim.error, sim.flowRate, sim.pressureDrop )
				}

				sim.counter++
			}
			//console.log(sim)			
			
			

		}
	}
	


	if( typeof(input.scaleDiameter) === 'number' && typeof(input.scaleFlowRate) === 'number' ){
		if ( input.calcType === 'pipeCalculation_velocity' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'			
			sim.flowRate = input.scaleFlowRate
			sim.diameter = input.scaleDiameter
			sim.velocity = sim.flowRate / (Math.PI * sim.diameter * sim.diameter * 0.25)
		}
		if ( input.calcType === 'pipeCalculation_pressureDrop' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'
			sim.flowRate = input.scaleFlowRate
			sim.diameter = input.scaleDiameter
			sim.length = stat.userInput.pipeCalculation.pipeLength
			pressureDrop(sim);
		}
	}
	
	if( typeof(input.scaleDiameter) === 'number' && typeof(input.scaleVelocity) === 'number' ){
		if ( input.calcType === 'pipeCalculation_velocity' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'
			sim.diameter = input.scaleDiameter
			sim.velocity = input.scaleVelocity
			sim.flowRate = sim.velocity * (Math.PI * sim.diameter * sim.diameter * 0.25)
		}
	}	


	//console.log(sim);
	return sim
}


export function radiatorCalculation(input){
	var f_2 = userInput.radiatorCalculation.f_2
	var f_3 = userInput.radiatorCalculation.f_3
	var f_4 = userInput.radiatorCalculation.f_4
/*
  possible cases. if more values are given, then needed for the case, the value will be dropped!
	in out mean OF	
	 0 0 1 1
	 0 1 0 1
	 0 1 1 0
	 1 0 0 1
	 1 0 1 0
	 1 1 0 0
*/
	var inflowTemp, outflowTemp, meanTemp,  deltaInflowTemp ,deltaOutflowTemp, deltaMeanTemp, f_1, oversizeFactor, power, flowRate

	if ( typeof(input.meanTemp) == "number" && typeof(input.oversizeFactor) == "number" ){}

	if ( typeof(input.outflowTemp) == "number" && typeof(input.oversizeFactor) == "number" ){
		//output not checked!!
		deltaOutflowTemp = input.outflowTemp - input.roomTemp
		f_1 = 1 / ( input.oversizeFactor * f_2 * f_3 * f_4 )
		deltaMeanTemp = Math.pow(f_1, (1 / input.radiator.exponent) ) * input.radiator.nominalTemp 
		deltaInflowTemp = deltaOutflowTemp + ( deltaMeanTemp - deltaOutflowTemp)  * 2   
		inflowTemp = deltaInflowTemp + input.roomTemp
		outflowTemp = input.outflowTemp
		oversizeFactor = input.oversizeFactor
		power = f_1 * f_2 * f_3 * f_4 * input.radiator.nominalPower
		}

	if ( typeof(input.outflowTemp) == "number" && typeof(input.meanTemp) == "number" ){}

	if ( typeof(input.inflowTemp) == "number" && typeof(input.oversizeFactor) == "number" ){
		deltaInflowTemp = input.inflowTemp - input.roomTemp
		f_1 = 1 / ( input.oversizeFactor * f_2 * f_3 * f_4 )
		deltaMeanTemp = Math.pow( f_1 , (1 / input.radiator.exponent) ) * input.radiator.nominalTemp 
		meanTemp = deltaMeanTemp + input.roomTemp
		outflowTemp = -(input.inflowTemp - meanTemp )*2 + input.inflowTemp
		deltaOutflowTemp = outflowTemp - input.roomTemp
		inflowTemp = input.inflowTemp
		oversizeFactor = input.oversizeFactor
		power = f_1 * f_2 * f_3 * f_4 * input.radiator.nominalPower

		}

	if ( typeof(input.inflowTemp) == "number" && typeof(input.meanTemp) == "number" ){}
		
	if ( typeof(input.inflowTemp) == "number" && typeof(input.outflowTemp) == "number" ){
		//if condition output is checked!
		//console.log(input)
		meanTemp = (input.inflowTemp + input.outflowTemp) / 2
		deltaInflowTemp = input.inflowTemp - input.roomTemp
		deltaOutflowTemp = input.outflowTemp - input.roomTemp
		deltaMeanTemp = meanTemp - input.roomTemp

		f_1 = Math.pow(( deltaMeanTemp / input.radiator.nominalTemp ), input.radiator.exponent )

		oversizeFactor = 1 / ( f_1 * f_2 * f_3 * f_4 )
		power = f_1 * f_2 * f_3 * f_4 * input.radiator.nominalPower
		inflowTemp = input.inflowTemp
		outflowTemp = input.outflowTemp
		}
	
	
	return {
		inflow: inflowTemp,
		mean: meanTemp,
		outflow: outflowTemp,
		deltaInflow : deltaInflowTemp,
		deltaMean : deltaMeanTemp,
		deltaOutflow : deltaOutflowTemp,
		oversizeFactor : oversizeFactor,
		power : power ,
		flowRate: flowRate
		}

}

export function massFlowCalculation(input){
	var sf, counter
	var lookback = []
	var sim = {}
	sim.verboseLevel = input.verboseLevel
	if ( input.verboseLevel > 1 ){
		console.log(input)
	}
	
	if( typeof(input.scalePower) === 'number' && typeof(input.scaleTemperature) === 'number' ){
		if ( input.calcType === 'massFlowRate_volumeFlow' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'			
			sim.power = input.scalePower
			sim.temperature = input.scaleTemperature
			
			sim.rho = brine(
			userInput.massFlowCalculation.brineType, 
			'rho', 
			userInput.massFlowCalculation.temperature, 
			userInput.massFlowCalculation.brineRatio
			);			
			sim.cp = brine(
			userInput.massFlowCalculation.brineType, 
			'cp', 
			userInput.massFlowCalculation.temperature, 
			userInput.massFlowCalculation.brineRatio
			);			
			sim.volumeFlow = sim.power / ( sim.rho * sim.cp * sim.temperature )
		}
	}
	if( typeof(input.scalePower) === 'number' && typeof(input.scaleVolumeFlow) === 'number' ){
		if ( input.calcType === 'massFlowRate_volumeFlow' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'			
			sim.power = input.scalePower
			sim.volumeFlow = input.scaleVolumeFlow
			
			sim.rho = brine(
			userInput.massFlowCalculation.brineType, 
			'rho', 
			userInput.massFlowCalculation.temperature, 
			userInput.massFlowCalculation.brineRatio
			);			
			sim.cp = brine(
			userInput.massFlowCalculation.brineType, 
			'cp', 
			userInput.massFlowCalculation.temperature, 
			userInput.massFlowCalculation.brineRatio
			);			
			
			sim.temperature = sim.power / ( sim.volumeFlow * sim.rho * sim.cp )
		}
	}
	return sim
	
	/*
	
	var power, flowRate, deltaTemp
  var rho = brine(
		userInput.massFlowCalculation.brineType, 
		'rho', 
		userInput.massFlowCalculation.temperature, 
		userInput.massFlowCalculation.brineRatio
		);	
				
	var cp = brine(
		userInput.massFlowCalculation.brineType, 
		'cp', 
		userInput.massFlowCalculation.temperature, 
		userInput.massFlowCalculation.brineRatio
		);			

	if ( typeof(input.power) != 'number' ){
		power = cp * input.flowRate * rho * input.deltaTemp
		flowRate = input.flowRate
		deltaTemp = input.deltaTemp		
		}
	if ( typeof(input.deltaTemp) != 'number' ){
		power = input.power
		flowRate = input.flowRate
		deltaTemp =  power / ( rho  * cp * input.flowRate ) 
		}
	if ( typeof(input.flowRate) != 'number' ){
		power = input.power
		flowRate = input.power / ( rho * cp * input.deltaTemp )
		deltaTemp = input.deltaTemp

		}
	
	return {
		power : power,
		flowRate : flowRate,
		deltaTemp : deltaTemp
		}
	*/	
		
	}


function heatStorageSimulation(sim, endType, endValue){
	//sim.cylLossResistance = 1 / ((1/12) * Math.pow( sim.cylVolume * 1000 ,0.5)) //ok
	var i=1
	var lookback = []
	
	if ( sim.verboseLevel > 2 ){
	console.log('start', endType, endValue)
	}
	sim.step = 0
	sim.active = true
	
	//console.log(sim, endType, endValue)
	while( sim.active === true && i < 1000){
		if ( i === 999 ){ sim.status = 'WARNING maximum steps is reached! increase step size or check for bugs.'}

	switch (String(endType)) {
		case 'userVolume' :
			sim.distToEndValue = ( endValue - sim.userVolume ) * 30
			break;
		case 'cylMinTemp' :
			sim.distToEndValue = ( endValue - sim.cylTemp ) * 0.1
			break;
		case 'userVolumeReheat' :
			if ( sim.userVolume <= endValue ){
				sim.distToEndValue = ( endValue - sim.userVolume ) * 10
			} else { sim.distToEndValue = 100 }
			break;
		default :
			sim.distToEndValue = 10
	}

		//change timestep, if near tripping points
		var frf = 0 
		if ( sim.userFlowRate === 0 ){ frf = 1 }
		
		if ( sim.timestepAuto === true ){
			// tripping point: hgOff
			sim.deltaTrip = Math.min(
			Math.abs(sim.cylTemp - sim.hgOffTemp) * ( 0.5 + 0.5 * frf ),
			
			// tripping point: hgOn
			Math.abs(sim.cylTemp - sim.hgOnTemp) * ( 0.5 + 0.5 * frf ),
			
			// tripping point: MinTemp
			Math.abs(sim.cylTemp - sim.userTemp),
			
			// tripping point: end Value
			Math.abs(sim.distToEndValue)
			
			)
			
			if ( sim.deltaTrip < (1/sim.timestepConfinement) * sim.timestepMax ){
				sim.timestep = Math.max( sim.deltaTrip * sim.timestepConfinement , 1)
				} else {
				sim.timestep = sim.timestepMax
			}
			

			} else {
			
			sim.timestep = sim.timestepMax
			
		}
		//calculate reheat time
		
		sim.step = i
		sim.time = sim.time + sim.timestep


		if ( sim.hgTemp > sim.hgNomTemp ){ 		
			sim.hgResistance = (sim.hgTemp - sim.hgNomTemp) / sim.hgNomPower  //ok
			} else {
			sim.hgResistance = (sim.hgTemp - sim.cylTemp) / sim.hgNomPower 
		}


		//high cyl temp --> hg is off.
		if ( sim.cylTemp >= sim.hgOffTemp ){ sim.hgPower = 0 }

		// area with on / off hysteresis!
		if ( sim.cylTemp <= sim.hgOffTemp && sim.cylTemp > sim.hgOnTemp ){
			if ( typeof( lookback[1] ) !== 'undefined' ){
				if ( lookback[0].cylTemp > lookback[1].cylTemp ){
					sim.hgPower = (sim.hgTemp - sim.cylTemp) / sim.hgResistance  //hgTemp - cylTemp 
					} else {													 //-----------------  * nomPower
					sim.hgPower = 0												 //hgTemp - nomTemp
				}
				} else { 
				sim.hgPower = 0
			}
			
		}

		
		// linear degradation of power
		if ( sim.cylTemp <= sim.hgOnTemp && sim.cylTemp > sim.hgNomTemp  ){ 
			sim.hgPower = (sim.hgTemp - sim.cylTemp) / sim.hgResistance
			}

		// dont go higher then nom. power!!
		if ( sim.cylTemp < sim.hgNomTemp ){
			sim.hgPower = sim.hgNomPower
			}


		sim.hgEnergy = sim.hgPower * sim.timestep  //ok
		
		sim.cylLossPower = (sim.cylTemp - sim.roomTemp) / sim.cylLossResistance  //ok
		sim.cylLossEnergy = sim.cylLossPower * sim.timestep //ok
		
		//userTemp must be changed, if cylTemp < userTemp 
		// ---> hwFlowRate must be increased until hwFlowrate = userFlowRate
		if ( sim.userTemp <= sim.cylTemp ){
			sim.userPower = sim.userCp * 1000 * (sim.userFlowRate * sim.userRho) * ( sim.userTemp - sim.coldWaterTemp) //ok		
			} else {
			sim.userPower = sim.cylCp * 1000 * (sim.userFlowRate * sim.userRho) * ( sim.cylTemp - sim.coldWaterTemp) //ok					
		}
		sim.userEnergy = sim.userPower * sim.timestep // ok
		sim.hwEnergy = sim.userEnergy //ok
		sim.hwPower = sim.userPower //ok
		sim.hwFlowRate = sim.hwPower / ( sim.cylCp * 1000 * (sim.cylTemp - sim.coldWaterTemp) * sim.cylRho ) //ok


		//calculate volume sums
		if ( typeof( lookback[0] ) !== 'undefined' ){
			sim.userVolume = lookback[0].userVolume + sim.userFlowRate * sim.timestep //ok
		}
		if ( typeof( lookback[0] ) !== 'undefined' ){
			sim.hwVolume = lookback[0].hwVolume + sim.hwFlowRate * sim.timestep //ok
		}


		//calculate energy sum
		sim.sumPower = sim.hgPower - sim.cylLossPower - sim.hwPower //ok
		sim.sumEnergy = sim.sumPower * sim.timestep //ok
		
		
		// add energy bilance to cylinder temperature !!
		if ( typeof( lookback[0] ) !== 'undefined' ){
			sim.cylTemp = lookback[0].cylTemp + sim.sumEnergy / ( sim.cylCp * 1000 * sim.cylVolume * sim.cylRho ) //ok
		}
		
		//set markers for reheat start and stop
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.cylTemp > lookback[0].cylTemp && lookback[0].cylTemp < lookback[1].cylTemp && sim.hgPower !== 0 ){ sim.reheatStart = sim.time}
			if ( sim.cylTemp >= sim.hgOffTemp ){ sim.reheatStop = sim.time}
		}

		// set markers for start and stop time
		if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.userFlowRate > lookback[0].userFlowRate && lookback[0].userFlowRate === 0 ){ sim.usageStart = sim.time}
			if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
			if ( sim.userFlowRate < lookback[0].userFlowRate && sim.userFlowRate === 0 ){ sim.usageStop = sim.time}
		}

		// set markers for start and stop time
		if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.userFlowRate > lookback[0].userFlowRate && lookback[0].userFlowRate === 0 ){ sim.usageStart = sim.time}
			if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
			if ( sim.userFlowRate > 0 ){ sim.usageStop = sim.time}
		}

		//
		if (sim.usageStop !== 'infinite'){
			sim.usageTime = sim.usageStop - sim.usageStart
			} else {
			sim.usageTime = 'infinite'
		}


		// set counter for usage Volume
		if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.userFlowRate > lookback[0].userFlowRate && lookback[0].userFlowRate === 0 ){ sim.usageStart = sim.time}
			if ( sim.userFlowRate > 0 && sim.step === 1 ){ sim.usageStart = 0 }
			if ( sim.userFlowRate < lookback[0].userFlowRate && sim.userFlowRate === 0 ){ sim.usageStop = sim.time}
		}

		// set trailing value for minimal cylinder temperature
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.cylTemp < lookback[0].cylTemp ){ 
				sim.cylMinTemp = sim.cylTemp}
		}

		// set trailing value for temperature at the tap
		if ( typeof( lookback[0] ) !== 'undefined' ){
			if ( sim.cylTemp < sim.userTemp ){ 
				sim.userMinTemp = sim.cylTemp} else {
				sim.userMinTemp = sim.userTemp 
			}
		}




		if ( endType === 'cylTemp' ){
			////////////////////////
			// calculate, if draw off should be ended
			// userActualTemp = min (cylTemp,userTemp)
			// if userActualTemp < userMinTemp ; then userFlowrate = 0 and start reheat


			if ( sim.cylTemp < endValue ){ 
				sim.active = false
					console.log('DEBUG')
				sim.userFlowRate = 0
				sim.status = 'Minimum user Temperature reached. reheat can be calculated'
				}


			// stop flowRate, if heater is switched on and temperature is rising!
			// so no reheat time applicable
			if ( typeof( lookback[0] ) !== 'undefined' ){
				if ( sim.cylTemp > lookback[0].cylTemp && sim.userFlowRate > 0 ){
					sim.active = false 
					console.log('DEBUG')
					sim.userFlowRate = 0 
					sim.status = 'On-Off mode between hgOn and hgOff, as flowrate is small'
					sim.usageStop = 'infinite'
					}
			}

			// set flowRate to zero, if equilibrium is reached --> usageTime = infinite
			if ( typeof( lookback[0] ) !== 'undefined' ){
				if ( Math.abs( (sim.cylTemp - lookback[0].cylTemp) / sim.timestep)  < 0.001 ){
					console.log('DEBUG')
					sim.active = false
					sim.usageStop = 'infinite'
					sim.userFlowRate = 0
					sim.status = 'Equilibrium between Power of heat generator and draw off reached. Increase flowrate, or reduce heater Power!'
				}
			}
			
			//stop sim also, if hg switches off 
			if ( sim.cylTemp >= sim.hgOffTemp ){
				sim.active = false
				sim.status = 'cylTemp >= sim.hgOffTemp ... heater reheated to switchoff temperature'
			}
			
		
		}
		
		if ( endType === 'userVolume' ){
			if ( sim.userVolume >= endValue ){
				//console.log('case: userVolume')
				sim.active = false
				sim.status = 'success'
				sim.status2 = 'userVolume >= given Value: ' + endValue
			}
		}

		if ( endType === 'usageTime' ){
			if ( sim.usageTime >= endValue ){
				sim.active = false
				sim.status = 'success'
				sim.status2 = 'usageTime >= given value: ' + endValue
			}
		}

		if ( endType === 'usageProfile'){
			//enter here different szenarios which also include change of flowRate, depending on british standards table
		}

		if ( endType === 'cylMinTemp'){
			if ( sim.cylMinTemp <= endValue ){
				//console.log('case: cylMinTemp')
				sim.active = false
				sim.status = 'success'
				sim.status2 = 'cylMinTemp <= given value: ' + endValue
			}
		}

		if ( endType === 'userVolumeReheat' ){
			if ( sim.userVolume >= endValue ){
				//console.log('case: userVolumeReheat', sim.userVolume , endValue)
				sim.userFlowRate = 0
				if ( sim.cylTemp >= sim.hgOffTemp ){
					sim.active = false
					sim.status = 'success'
					sim.status2 = 'hgOff temperature reached! '
				}
				if ( sim.cylTemp >= sim.hgOnTemp && sim.hgPower === 0 ){
					sim.active = false
					sim.status = 'failed'
					sim.status2 = 'FlowRate zero and heater not on! '
				}
				
				if ( typeof( lookback[0] ) !== 'undefined' ){
					if ( ( Math.abs( sim.cylTemp - lookback[0].cylTemp) / sim.timestep ) < 1e-6 ){
						sim.active = false
						sim.status = 'failed'
						sim.status2 = 'Equilibrium temperature! no reheat time possible '
					}
				}
			}
		}

		//deep copy, before saving to lookback !
		let simCopy = JSON.parse(JSON.stringify(sim));
		lookback.unshift(simCopy) 

		if ( sim.verboseLevel > 2 && i === 1 ){
		console.log(JSON.stringify(sim,null,2))
		}

		if ( sim.verboseLevel > 2 && i === 1 ){
		console.log('sim.step, sim.time, sim.timestep, sim.hgPower, sim.hwPower, sim.cylLossPower, sim.cylTemp, sim.hwFlowRate, sim.userVolume, sim.distToEndValue, sim.deltaTrip ')
		}
		
		if ( sim.verboseLevel > 2 ){
		console.log(sim.step, sim.time, sim.timestep, sim.hgPower, sim.hwPower, sim.cylLossPower, sim.cylTemp, sim.hwFlowRate, sim.userVolume, sim.distToEndValue, sim.deltaTrip)
		}


		i++
	}
	
	if ( sim.verboseLevel > 2 ){
	console.log(JSON.stringify(sim,null,2))
	}
	
	
	
	sim.reheatTime = sim.reheatStop - sim.reheatStart
	// end loop
	return sim
	}

export function heatStorageCalculation(input){
	if ( input.verboseLevel > 1 ){
		console.log(input)
	}
	//console.log(stat.userInput[input.nomoName])
	var sim = {
		// all in SI units, except temperature in °C !!!
		hgName : input.hgName,
		cylName : input.cylName,
		hgNomPower : stat.userSetup.heatGenerators[input.hgName].hgNomPower,  
		hgNomTemp : stat.userSetup.heatGenerators[input.hgName].hgNomTemp,     		// at wich temperature has heat generator its nominal power e.g. Nominal Power at heating from 10° to 45° = mean 27,5°
		hgOffTemp : stat.userSetup.heatGenerators[input.hgName].hgOffTemp,     		// temperature , where the heater is switched on
		hgOnTemp : stat.userSetup.heatGenerators[input.hgName].hgOnTemp,				// temperature , where the heater is switched on
		hgTemp : stat.userSetup.heatGenerators[input.hgName].hgTemp,				// temperature where power is zero

		cylTemp : stat.userSetup.heatGenerators[input.hgName].hgOffTemp,
		cylMinTemp : stat.userSetup.heatGenerators[input.hgName].hgOffTemp,
		cylVolume : stat.userSetup.storageCylinders[input.cylName].cylVolume,
		userTemp : stat.userInput[input.nomoName].userTemp,							// userTemp is a constant value during sim. It is the desired temp at the tap. If cyl is hotter than userTemp, the user gets his temp
		userFlowRate : stat.userInput[input.nomoName].userFlowRate,  
		
		coldWaterTemp : stat.userInput[input.nomoName].coldWaterTemp,
		timestepMax : stat.userInput[input.nomoName].timestepMax,
		timestepAuto : stat.userInput[input.nomoName].timestepAuto,
		timestepConfinement : stat.userInput[input.nomoName].timestepConfinement,
		userVolume : 0,
		hwVolume : 0,
		time : 0,
		reheatStart : 0,
		reheatStop : 0,
		roomTemp : stat.userInput[input.nomoName].roomTemp,
		brineType : stat.userSetup.storageCylinders[input.cylName].brineType,
		brineRatio : stat.userSetup.storageCylinders[input.cylName].brineRatio,
		verboseLevel : input.verboseLevel
	}

	if ( typeof(stat.userSetup.storageCylinders[input.cylName].cylLossResistance) !== 'number' ){
		sim.cylLossResistance = 
		12 / Math.pow(stat.userSetup.storageCylinders[input.cylName].cylVolume , 0.5)	// commonly R= U_HG * A_HG, can be estimated with formula 12 / sqrt(vol in Liter)
	} else {
		sim.cylLossResistance = stat.userSetup.storageCylinders[input.cylName].cylLossResistance
	}


	// add here brine.js 
	sim.cylCp = 4.2
	sim.cylRho = 1000
	sim.userCp = 4.2
	sim.userRho = 1000
	
	//console.log(input)

	// add here bugfix , if ending of scale is "_number" , then remove _number
	if(typeof(input.scaleMinimumTemperature_1) === 'number'){ input.scaleMinimumTemperature = input.scaleMinimumTemperature_1 }
	if(typeof(input.scaleMinimumTemperature_2) === 'number'){ input.scaleMinimumTemperature = input.scaleMinimumTemperature_2 }
	if(typeof(input.scaleMinimumTemperature_3) === 'number'){ input.scaleMinimumTemperature = input.scaleMinimumTemperature_3 }

	
	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleFlowRate) === 'number' ){
		if ( sim.verboseLevel > 1 ){
			console.log('case 1') 
		}

		sim.cylVolume = input.scaleStorageVolume
		sim.userFlowRate = input.scaleFlowRate 
		sim.userFlowRateSetting = sim.userFlowRate
		sim = heatStorageSimulation(sim,'cylTemp',sim.userMinTemp)
		if ( sim.verboseLevel > 1 ){
			console.log('-', '-', sim.error, sim.cylMinTemp, sim.userMinTempOld, sim.cylVolume, sim.userVolume, sim.hgNomPower)
		}
		
	} 
	
	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleUsageTime) === 'number' ){
		if ( sim.verboseLevel > 1 ){
			console.log('case 2')
		}
		// console.log('now iterate userFlowRate solution to search usageTime')
		// ---> change it to iterate second manual scale, dpending on what will be decision by paul!!!
		// e.g. search usageTime by iterating drawOff Volume, 


		// use this only in the case, if 
		// Volume is  pivot-point on scale and 
		// userFlowrate is second manual scale
		// console.log(input)
		sim.cylVolume = input.scaleStorageVolume
		sim.oldUsageTime = input.scaleUsageTime
		sim.userFlowRateSetting = sim.userFlowRate
		sim = heatStorageSimulation(sim)


		var sf
		if (sim.usageTime < sim.oldUsageTime ){
			sf = sim.userFlowRateSetting * 0.2
			} else { sf = sim.userFlowRateSetting * -0.2 
		}

		sim.error = sim.usageTime - sim.oldUsageTime
		var lookback = []
		var counter = 0
		sim.cancel = false
			/*
			console.log(counter, sim.step,
				sim.cylVolume, sim.userFlowRateSetting, 
				sim.usageTime, sim.oldUsageTime, sim.status
				)
			*/
		while ( sim.cancel === false ){
		//		while ( counter  <= 30 ){
			if (sim.usageTime > sim.oldUsageTime ){
				//console.log('time > oldTime')
				sim.userFlowRate = sim.userFlowRateSetting + sf
				} else {
				//console.log('time < oldTime')
				sim.userFlowRate = sim.userFlowRateSetting - sf
			}
			
			sim.userFlowRateSetting = sim.userFlowRate
			sim.userVolume = 0
			sim.hwVolume = 0
			sim.time = 0

			sim = heatStorageSimulation(sim)
			//console.log(sim)
			//var oldError = error
			sim.error = sim.usageTime - sim.oldUsageTime
			
			//wrong search direction: turn search direction
			if ( typeof( lookback[3] ) !== 'undefined' ){
				//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )

				if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
					//	console.log('change direction')
					sf = sf * -1
					}
			
				if ((sim.error >= 0 && lookback[0].error < 0 ) ||
					(sim.error < 0 && lookback[0].error >= 0) ){
					//	console.log('refining')
					 sf = sf * -0.5
					}

				//calculate sma
				if ( typeof(sim.error) === 'number' && 
					typeof(lookback[0].error) === 'number' && 
					typeof(lookback[1].error) === 'number' && 
					typeof(lookback[2].error) === 'number' ){
					sim.sma4 = ( sim.error + lookback[0].error + lookback[1].error + lookback[2].error) / 4 
				
					if ( Math.abs(sim.sma4 - lookback[0].sma4 )< 0.1){
						console.log('cond 1')
						sim.cancel = true
						}
					}
				
				if (
					//Math.abs(sim.error) > Math.abs(lookback[0].error) ||   //not working
					Math.abs(sim.error) <= 5 || 
					counter >= 30 
					){
					console.log('cond 2')
					sim.cancel = true 
				}
			}

			let simCopy = JSON.parse(JSON.stringify(sim));
			lookback.unshift(simCopy) 			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userMinTempOld, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}

			counter++
			// Bug flow rate goes into negative... no search value found.
			
			
		}
	}

	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleReheatTime1) === 'number' ){
		// this part is not finally tested. handle with care!!
		if ( sim.verboseLevel > 1 ){
			console.log('case 3')
		}
		// console.log('now iterate userFlowRate solution to search reheatTime')
		// console.log(input)
		sim.cylVolume = input.scaleStorageVolume
		sim.oldReheatTime = input.scaleReheatTime1
		sim.userFlowRateSetting = sim.userFlowRate
		// console.log(sim.usageTime , sim.oldUsageTime)  undefined, number
		sim = heatStorageSimulation(sim)
		// console.log(sim.usageTime , sim.oldUsageTime)


		
		if (sim.reheatTime < sim.oldReheatTime ){
			sf = sim.userFlowRateSetting * 0.2
			} else { sf = sim.userFlowRateSetting * -0.2 
		}

		sim.error = sim.reheatTime - sim.oldReheatTime
		lookback = []
		counter = 0
		sim.cancel = false
			/*
			console.log(counter, sim.step,
				sim.cylVolume, sim.userFlowRateSetting, 
				sim.usageTime, sim.oldUsageTime, sim.status
				)
			*/
		while ( sim.cancel === false ){
		//		while ( counter  <= 30 ){
			if (sim.reheatTime > sim.oldReheatTime ){
				//console.log('time > oldTime')
				sim.userFlowRate = sim.userFlowRateSetting + sf
				} else {
				//console.log('time < oldTime')
				sim.userFlowRate = sim.userFlowRateSetting - sf
			}
			
			sim.userFlowRateSetting = sim.userFlowRate
			sim.userVolume = 0
			sim.hwVolume = 0
			sim.time = 0

			sim = heatStorageSimulation(sim)
			//console.log(sim)
			//var oldError = error
			sim.error = sim.reheatTime - sim.oldReheatTime
			
			//wrong search direction: turn search direction
			if ( typeof( lookback[3] ) !== 'undefined' ){
				//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )

				if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
					//	console.log('change direction')
					sf = sf * -1
					}
			
				if ((sim.error >= 0 && lookback[0].error < 0 ) ||
					(sim.error < 0 && lookback[0].error >= 0) ){
					//	console.log('refining')
					 sf = sf * -0.5
					}

				//calculate sma
				if ( typeof(sim.error) === 'number' && 
					typeof(lookback[0].error) === 'number' && 
					typeof(lookback[1].error) === 'number' && 
					typeof(lookback[2].error) === 'number' ){
					sim.sma4 = ( sim.error + lookback[0].error + lookback[1].error + lookback[2].error) / 4 
				
					if ( Math.abs(sim.sma4 - lookback[0].sma4 ) < 0.01){
						console.log('cond 1')
						sim.cancel = true
						}
					}
				
				if (
					//Math.abs(sim.error) > Math.abs(lookback[0].error) ||   //not working
					Math.abs(sim.error) <= 5 || 
					counter >= 30 
					){
					console.log('cond 2')
					sim.cancel = true 
				}
			}

			let simCopy = JSON.parse(JSON.stringify(sim));
			lookback.unshift(simCopy) 			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userMinTempOld, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}

			counter++
			// Bug flow rate goes into negative... no search value found.
			
		}
	} 

	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleUsageVolume) === 'number' ){
		if ( sim.verboseLevel > 1 ){
			console.log('case 4')		
		}
		
		if(input.calcType === 'heatStorageCalculation_minimumTemperature' ){
			//wanted is minimum Temperature in Cylinder. This can be done by single simulation.
			
			sim.cylVolume = input.scaleStorageVolume
			
			//console.log(input)
			//console.log(sim)
			
			sim = heatStorageSimulation(sim,'userVolume',input.scaleUsageVolume)
			if ( sim.verboseLevel > 1 ){
				console.log('-', '-', '-', sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}
			sim.error = ( sim.userVolume - input.scaleUsageVolume ) / input.scaleUsageVolume
			sim.status2 = ' && no iterated search'
			
		}
		
		if(input.calcType === 'heatStorageCalculation_hgPower' ){
			// iterate hgPower, to find hgPower, which produces a end temperature of userMinTemp

			sim.cylVolume = input.scaleStorageVolume
			sim.userMinTemp = input.userMinTemp
			sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp
			sim.hgPower = stat.userSetup.heatGenerators[input.hgName].hgPower
			// stop sim at userVolume and vary hgPower
			sim = heatStorageSimulation(sim,'userVolume', input.scaleUsageVolume)

			sim.error = ( sim.cylMinTemp - sim.userTemp ) / sim.userTemp
			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}
			
			
			if (sim.error >= 0 ){
				sf = sim.hgNomPower * 0.1
				} else { sf = sim.hgNomPower * -0.1 
			}
			
			lookback = []
			counter = 0
			sim.cancel = false

			while ( sim.cancel === false ){
			//while ( counter  <= 10 ){
				if ( sim.error >= 0 ){
					//console.log('time > oldTime')
					sim.hgNomPower = sim.hgNomPower - sf
					} else {
					//console.log('time < oldTime')
					sim.hgNomPower = sim.hgNomPower + sf
				}

				sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp				
				sim.userVolume = 0
				sim.hwVolume = 0
				sim.time = 0
				//console.log(JSON.stringify(sim, null, 2))

				sim = heatStorageSimulation(sim,'userVolume', input.scaleUsageVolume)
				//console.log(sim)
				//var oldError = error
				sim.error = ( sim.cylMinTemp - sim.userTemp ) / sim.userTemp
				
				//wrong search direction: turn search direction
				if ( typeof( lookback[3] ) !== 'undefined' ){
					//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						//	console.log('change direction')
						sf = sf * -1
						}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						//	console.log('refining')
						 sf = sf * -0.5
						}

					if ( counter >= 100 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1, counter max reached!')
						}
						sim.status2 = ' && loop exit condition 1, counter maximum reached: ' + counter
						sim.cancel = true 
					}
					
					if ( Math.abs(sim.error) <= 0.001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2, error < 0.1%')
						}
						sim.status2 = ' && loop exit condition 2, search error smaller 0.001: ' + Math.abs(sim.error)
						sim.cancel = true 
					}
					
					if ( sim.hgNomPower <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3: hgNomPower = 0')
						}
						sim.status2 = ' && loop exit condition 3, hgNom Power <= 0'
						// set here a marker for not using this calculation in nomograph
						sim.status3 = true
						sim.cancel = true 
					}

					
				}

				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
				}
				counter++
			}
		}
	} 

	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleMinimumTemperature) === 'number' ){
		if ( sim.verboseLevel > 1 ){
			console.log('case 5')
		}
		//console.log('now get userVolume according to minimumTemperature === cylMinTemp ')
		if(input.calcType === 'heatStorageCalculation_minimumTemperature' ){
			sim.cylVolume = input.scaleStorageVolume
			sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp
			
			sim = heatStorageSimulation(sim,'cylMinTemp',input.scaleMinimumTemperature)
			if ( sim.verboseLevel > 1 ){
				console.log('-', '-', '-', sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}
			sim.error = ( sim.cylTemp - input.scaleMinimumTemperature ) / input.scaleMinimumTemperature
			sim.status2 = ' && no iterated search'
		}
	} 


	if( typeof(input.scaleStorageVolume) === 'number' && typeof(input.scaleHgPower) === 'number' ){
		// return draw-off volume
		
		if ( sim.verboseLevel > 1 ){
			console.log('case 6')		
		}
		
		if(input.calcType === 'heatStorageCalculation_usageVolume' ){
			//make simulation, to get draw-off volume, stop at 45 deg.
			sim.hgNomPower = input.scaleHgPower
			sim.cylVolume = input.scaleStorageVolume
			//sim.userTemp = 
			//sim.cylMinTemp = sim.hgOffTemp
			sim = heatStorageSimulation(sim,'cylMinTemp',sim.userTemp)

			
			if ( sim.verboseLevel > 1 ){
				console.log('-', '-', '-', sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}

			sim.error = ( sim.cylMinTemp - sim.userTemp ) / sim.userTemp
			sim.status2 = ' && no iterated search'
		}
		
		if(input.calcType === 'heatStorageCalculation_hgPower' ){
			//make simulation, to get draw-off volume, stop at 45 deg.
			sim.hgNomPower = input.scaleHgPower
			sim = heatStorageSimulation(sim,'cylMinTemp',sim.userTemp)
			if ( sim.verboseLevel > 1 ){
				console.log('-', '-', '-', sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}
			sim.error = ( sim.cylMinTemp - sim.userTemp ) / sim.userTemp
			sim.status2 = ' && no iterated search'
		}
		
	} 

	if( typeof(input.scaleUsageVolume) === 'number' && typeof(input.scaleHgPower) === 'number' ){

		
		if ( sim.verboseLevel > 1 ){
			console.log('case 7')		
		}
		
		if(input.calcType === 'heatStorageCalculation_usageVolume' ){
			//make simulation, to get cylinder volume, 
			// iterate hgPower, stop at userTemp in deg.
			sim.hgNomPower = input.scaleHgPower
			//sim.cylVolume = 0.5
			
			//console.log(input.userTemp)
			sim = heatStorageSimulation(sim,'cylMinTemp',input.userTemp)

			//sim = heatStorageSimulation(sim,'userVolume',input.scaleUsageVolume)

			sim.error = ( sim.userVolume - input.scaleUsageVolume ) / input.scaleUsageVolume
			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
			}
			
			
			if (sim.error >= 0 ){
				sf = sim.cylVolume * -0.1
				} else { sf = sim.cylVolume * 0.1 
			}
			
			lookback = []
			counter = 0
			sim.cancel = false

			while ( sim.cancel === false ){
			//while ( counter  <= 10 ){
				if ( sim.error >= 0 ){
					//console.log('time > oldTime')
					sim.cylVolume = sim.cylVolume - sf
					} else {
					//console.log('time < oldTime')
					sim.cylVolume = sim.cylVolume + sf
				}

				sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp				
				sim.cylMinTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp				
				sim.userVolume = 0
				sim.hwVolume = 0
				sim.time = 0
				//console.log(JSON.stringify(sim, null, 2))

				sim = heatStorageSimulation(sim,'cylMinTemp',input.userTemp)
				//console.log(sim)
				//var oldError = error
				sim.error = ( sim.userVolume - input.scaleUsageVolume ) / input.scaleUsageVolume
				
				//wrong search direction: turn search direction
				if ( typeof( lookback[3] ) !== 'undefined' ){
					//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						//	console.log('change direction')
						sf = sf * -1
						}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						//	console.log('refining')
						 sf = sf * -0.5
						}

					if ( counter >= 100 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1, counter max reached!')
						}
						sim.status2 = ' && loop exit condition 1, counter maximum reached: ' + counter
						sim.cancel = true 
					}
					
					if ( Math.abs(sim.error) <= 0.001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2, error < 0.1%')
						}
						sim.status2 = ' && loop exit condition 2, search error smaller 0.001: ' + Math.abs(sim.error)
						sim.cancel = true 
					}
					
					if ( sim.cylVolume <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3: cylVolume = 0')
						}
						sim.status2 = ' && loop exit condition 3, cylVolume <= 0'
						// set here a marker for not using this calculation in nomograph
						sim.status3 = true
						sim.cancel = true 
					}

					
				}

				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower)
				}
				counter++
			}
		}

		if ( input.calcType === 'heatStorageCalculation_reheatTime' ){
			//make simulation, to get reheat time, 
			// no iteration, start reheat at usage Volume, end reheat at hgOffTemp
			
			sim.hgNomPower = input.scaleHgPower
			sim.userTemp = input.userTemp
			
			sim = heatStorageSimulation(sim,'userVolumeReheat',input.scaleUsageVolume)
			if ( sim.verboseLevel > 1 ){
				console.log('counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower, sim.reheatTime')
			}

			
			if ( sim.verboseLevel > 1 ){
				console.log(sim)
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower, sim.reheatTime)
			}

			sim.error = ( sim.userVolume - input.scaleUsageVolume ) / input.scaleUsageVolume
			sim.status2 = ' && no iterated search'
			
		}		
	} 

	if( typeof(input.scaleReheatTime) === 'number' && typeof(input.scaleHgPower) === 'number' ){
		// Power (is pivot)
		// variation of draw off, start-value = 100liter

		// error is reheat time!!

		if ( sim.verboseLevel > 1 ){
			console.log('case 8')		
		}

		if( input.calcType === 'heatStorageCalculation_reheatTime' ){
			
			sim.userTemp = input.userTemp
			sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp
			sim.hgNomPower = input.scaleHgPower
			
			// stop sim at userVolume and vary hgPower
			sim = heatStorageSimulation(sim,'userVolumeReheat',input.userVolume)
			sim.error = ( input.scaleReheatTime - sim.reheatTime) / input.scaleReheatTime

			if ( sim.verboseLevel > 1 ){
				console.log('counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower, sim.reheatTime')
			}

			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower, sim.reheatTime)
			}
			

			if (sim.error >= 0 ){
				sf = input.userVolume * 0.1
				} else { sf = input.userVolume * -0.1 
			}

			lookback = []
			counter = 0
			sim.cancel = false

//			while ( counter < 1 ){
			while ( sim.cancel === false ){
				if ( sim.error >= 0 ){
					input.userVolume = input.userVolume - sf
					} else {
					input.userVolume = input.userVolume + sf
				}
				sim.userFlowRate = stat.userInput[input.nomoName].userFlowRate
				sim.cylTemp = stat.userSetup.heatGenerators[input.hgName].hgOffTemp				
				sim.userVolume = 0
				sim.hwVolume = 0
				sim.time = 0
				sim.reheatStart = 0
				sim.reheatStop = 0
				//console.log(JSON.stringify(sim, null, 2))
				sim = heatStorageSimulation(sim,'userVolumeReheat',input.userVolume)
				//console.log(sim)
				//var oldError = error
				sim.error = ( input.scaleReheatTime - sim.reheatTime) / input.scaleReheatTime
				
				//wrong search direction: turn search direction
				if ( typeof( lookback[3] ) !== 'undefined' ){
					//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )
					
					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
							//console.log('change direction')
						sf = sf * -1
						}
					
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
							//console.log('refining')
						 sf = sf * -0.5
						}

					if ( counter >= 80 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1, counter max reached!')
						}
						sim.status2 = ' && loop exit condition 1, counter maximum reached: ' + counter
						sim.cancel = true 
					}
					
					if ( Math.abs(sim.error) <= 0.001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2, error < 0.1%')
						}
						sim.status2 = ' && loop exit condition 2, search error smaller 0.001: ' + Math.abs(sim.error)
						sim.cancel = true 
					}
					
					if ( sim.hgNomPower <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3: hgNomPower = 0')
						}
						sim.status2 = ' && loop exit condition 3, hgNom Power <= 0'
						// set here a marker for not using this calculation in nomograph
						sim.status3 = true
						sim.cancel = true 
					}
					
					
					if ( sim.error === lookback[0].error ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 4: error no more change in error')
						}
						sim.status2 = ' && loop exit condition 4, probably no solution found'
						// set here a marker for not using this calculation in nomograph
						sim.cancel = true 
						
					}
					
					
				}

				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.cylMinTemp, sim.userTemp, sim.userMinTemp, sim.cylVolume, sim.userVolume, sim.hgNomPower, sim.reheatTime)
				}
				counter++
			}
			console.log(counter);
		}
	} 



	
	//console.log(sim)
	return( sim )
}


export function expansionVesselCalculation(input){
	var sf, counter
	var lookback = []
	if ( input.verboseLevel > 1 ){
		console.log(input)
	}
	
	var sim = {}
	
	if( typeof(input.scaleSysVolume) === 'number' && typeof(input.scalePrechargePressure) === 'number' ){
		if ( input.verboseLevel > 2 ){
			console.log('case 1: calculate expansion vessel size')
		}
		sim.error = 0
		sim.status = 'direct calculation'
		sim.status2 = ''
		sim.systemVolume = input.scaleSysVolume
		sim.prechargePressure = input.scalePrechargePressure
		sim.safetyPressure = userInput.expansionVessel1.systemSafetyPressure
		sim.rho_rt = brine(
			userInput.expansionVessel1.brineType, 
			'rho', 
			userInput.expansionVessel1.roomTemp, 
			userInput.expansionVessel1.brineRatio
		);
		
		sim.rho_hot = brine(
			userInput.expansionVessel1.brineType, 
			'rho', 
			userInput.expansionVessel1.maxTemp, 
			userInput.expansionVessel1.brineRatio
		);
		
		sim.expansionVolume = 1.25 * ( sim.systemVolume * ( sim.rho_rt - sim.rho_hot ) / sim.rho_hot)
		
		sim.vesselOutput = (( sim.safetyPressure + 1E5 ) - ( sim.prechargePressure + 1E5)) 
									/ ( sim.safetyPressure + 1E5) 
				
		sim.expansionVesselVolume = sim.expansionVolume / sim.vesselOutput

	}
	
	if( typeof(input.scaleSysVolume) === 'number' && typeof(input.scaleExpansionVesselVolume) === 'number' ){
		
		if( input.calcType === 'expansionVessel_VesselVolume' ){
			if ( input.verboseLevel > 2 ){
				console.log('case 2: calculate precharge pressure')
			}
			sim.error = 0
			sim.status = 'direct calculation'
			sim.status2 = ''

			sim.systemVolume = input.scaleSysVolume
			sim.safetyPressure = userInput.expansionVessel1.systemSafetyPressure
			sim.expansionVesselVolume = input.scaleExpansionVesselVolume
			sim.maxTemp = userInput.expansionVessel1.maxTemp

			sim.rho_rt = brine(
				userInput.expansionVessel1.brineType, 
				'rho', 
				userInput.expansionVessel1.roomTemp, 
				userInput.expansionVessel1.brineRatio
			);
			
			sim.rho_hot = brine(
				userInput.expansionVessel1.brineType, 
				'rho', 
				userInput.expansionVessel1.maxTemp, 
				userInput.expansionVessel1.brineRatio
			);
			
			sim.expansionVolume = 1.25 * ( sim.systemVolume * ( sim.rho_rt - sim.rho_hot ) / sim.rho_hot)
			sim.vesselOutput = sim.expansionVolume / sim.expansionVesselVolume 
			sim.prechargePressure =   sim.safetyPressure - sim.vesselOutput * ( sim.safetyPressure + 1E5)

		}

		if( input.calcType === 'expansionVessel_MaximumTemperature' ){
			if ( input.verboseLevel > 2 ){
				console.log('case 2b: calculate maximum Temperature')
			}
			sim.maxTemp = input.startvalue // just a random startpoint for search is needed.
			sim.systemVolume = input.scaleSysVolume
//			sim.expansionVesselVolume = 0.020
			sim.expansionVesselVolume = input.scaleExpansionVesselVolume
			sim.prechargePressure = userInput.expansionVessel2.systemPrechargePressure 
			sim.safetyPressure = userInput.expansionVessel2.systemSafetyPressure 
			sim.rho_rt = brine(
				userInput.expansionVessel2.brineType, 
				'rho', 
				userInput.expansionVessel2.roomTemp, 
				userInput.expansionVessel2.brineRatio
			);
			sim.vesselOutput = (( sim.safetyPressure + 1E5 ) - ( sim.prechargePressure + 1E5)) 
									/ ( sim.safetyPressure + 1E5) 
			sim.expansionVolume = sim.vesselOutput * sim.expansionVesselVolume
			//sim.expansionVolume = 1.25 * ( sim.systemVolume * ( sim.rho_rt - sim.rho_hot ) / sim.rho_hot)
			sim.rho_hot = sim.rho_rt / ( sim.expansionVolume /(1.25 * sim.systemVolume) + 1)
			
			// now iterate temp to get rho equal



			sim.rho_temp = brine(
				userInput.expansionVessel2.brineType, 
				'rho', 
				sim.maxTemp, 
				userInput.expansionVessel2.brineRatio
			);

			sim.error = ( sim.rho_hot - sim.rho_temp) / sim.rho_hot

			if ( input.verboseLevel > 1 ){
				console.log('counter, sf, sim.error, sim.rho_hot, sim.rho_temp, sim.maxTemp')
				console.log(counter, sf, sim.error, sim.rho_hot, sim.rho_temp, sim.maxTemp)
			}
			

			if (sim.error >= 0 ){
				sf = sim.maxTemp * -0.1
				} else { sf = sim.maxTemp * 0.1 
			}

			lookback = []
			counter = 0
			sim.cancel = false

			//console.log(JSON.stringify(sim,null,2))

//			while ( counter < 1 ){
			while ( sim.cancel === false ){
				if ( sim.error >= 0 ){
					sim.maxTemp = sim.maxTemp - sf
					} else {
					sim.maxTemp = sim.maxTemp + sf
				}

				sim.rho_temp = brine(
					userInput.expansionVessel2.brineType, 
					'rho', 
					sim.maxTemp, 
					userInput.expansionVessel2.brineRatio
				);

				sim.error = ( sim.rho_hot - sim.rho_temp) / sim.rho_hot
				
				//wrong search direction: turn search direction
				if ( typeof( lookback[0] ) !== 'undefined' ){
					//console.log(Math.abs(sim.error), Math.abs(lookback[0].error), counter )
					
					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
							//console.log('change direction')
						sf = sf * -1
						}
					
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
							//console.log('refining')
						 sf = sf * -0.5
						}

					if ( counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1, counter max reached!')
						}
						sim.status2 = ' && loop exit condition 1, counter maximum reached: ' + counter
						sim.cancel = true 
					}
					
					if ( Math.abs(sim.error) <= 0.00001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2, error < 0.1%')
						}
						sim.status2 = ' && loop exit condition 2, search error smaller 0.001: ' + Math.abs(sim.error)
						sim.cancel = true 
					}
					
					if ( sim.maxTemp > 120 || sim.maxTemp < 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3, out of range')
						}
						sim.status2 = ' && loop exit condition 3, temperature is out of range -50..100: ' + sim.maxTemp
						sim.cancel = true 
						
					}
					
					if ( sim.error === lookback[0].error ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 4: error no more change in error')
						}
						sim.status2 = ' && loop exit condition 4, probably no solution found'
						// set here a marker for not using this calculation in nomograph
						sim.cancel = true 
						
					}
					
					
				}

				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			

				if ( input.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.rho_hot, sim.rho_temp, sim.maxTemp)
				}
				counter++
			}

		}

	}

	if( typeof(input.scaleSysVolume) === 'number' && typeof(input.scaleMaximumTemp) === 'number' ){
		if( input.calcType === 'expansionVessel_MaximumTemperature' ){
			if ( input.verboseLevel > 1 ){
				console.log('case 3: calculate Expansion Vessel Size')
			}

			sim.error = 0
			sim.status = 'direct calculation'
			sim.status2 = ''

			sim.systemVolume = input.scaleSysVolume
			sim.maxTemp = input.scaleMaximumTemp
			sim.prechargePressure = userInput.expansionVessel2.systemPrechargePressure 
			sim.safetyPressure = userInput.expansionVessel2.systemSafetyPressure 




			sim.rho_rt = brine(
				userInput.expansionVessel2.brineType, 
				'rho', 
				userInput.expansionVessel2.roomTemp, 
				userInput.expansionVessel2.brineRatio
			);
			
			sim.rho_hot = brine(
				userInput.expansionVessel2.brineType, 
				'rho', 
				sim.maxTemp, 
				userInput.expansionVessel2.brineRatio
			);
			
			sim.expansionVolume = 1.25 * ( sim.systemVolume * ( sim.rho_rt - sim.rho_hot ) / sim.rho_hot)
			
			sim.vesselOutput = (( sim.safetyPressure + 1E5 ) - ( sim.prechargePressure + 1E5)) 
										/ ( sim.safetyPressure + 1E5) 
					
			sim.expansionVesselVolume = sim.expansionVolume / sim.vesselOutput
			
		}
	}
	
	return sim
}

function interpolate1D(table, x0){
	//table is a object. contains: x , val
	//value is a value to lookup 
	//field is the name of the output wanted!
	//console.log(table, x0)

	var length, i, order, end=0, cb
	length=Object.keys(table).length

	if (x0 >= table[0].x && x0 <= table[length - 1].x){

		if ( table[0].x > table[1].x ){ order = 'reverse'}

		if ( order === 'reverse' ){
			i=length - 1
			if ( (x0 > table[0].x) || (x0 < table[length - 1].x) ){
				console.log('WARNING! table-lookup was extrapolated.') 
				console.log('WARNING: ' + x0 + ' not in ' + table[0].x + '..' + table[length - 1].x )
				}

			end = 0
			while ( end === 0){
				if ( i > 0 && table[i].x <= x0 ){ 
					i-- 
					} else { 
					end = 1
					}
				}
			}		


		if ( order !== 'reverse' ){
			i=0
			if ( (x0 < table[0].x) || (x0 > table[length - 1].x) ){
				console.log('WARNING! table-lookup was extrapolated.') 
				console.log('WARNING! ' + x0 + ' not in ' + table[0].x + '..' + table[length - 1].x )
				}
				
			end = 0
			while ( end === 0){
				if ( i < length && table[i].x <= x0 ){ 
					i++ 
					} else { 
					end = 1
					}
				}
			}
			
		if ( order === 'reverse' ){ i = i + 1 }


		if (i === 0){

			cb = interpolate(
			table[i].x, 
			table[i].val, 
			table[i+1].x, 
			table[i+1].val, 
			x0)
			}

		if ( i > 0 && i < length){

			cb = interpolate(
			table[i-1].x, 
			table[i-1].val, 
			table[i].x, 
			table[i].val, 
			x0)
			} 
			
		if ( i >= length){
			cb = interpolate(
			table[i-2].x, 
			table[i-2].val, 
			table[i-1].x, 
			table[i-1].val, 
			x0)
			}

	}
	else {
		cb = 'error'
		//console.log( 'x0 out of table ' + x0, length)
	}
	return (cb)
}

function interpolate2D(table, x0, y0){
	//search all values around datapoint.
	// dataset must be sorted: ascending 1.Y  2.X  3.value
	// dataset must be a filled square shaped matrix !! no missing points.
	//y<y0, y>y0, x<x0, x>x0
	//just for testing:

	var index={}
	var value={}
	var length = Object.keys(table).length
	var i , dimension = {}
	var m = {
		a1 : {},
		a2 : {},
		a3 : {},
		b2 : {x: x0, y: y0},
		c1 : {},
		c2 : {},
		c3 : {},
		}
	
	if (x0 >= table[0].x && x0 <= table[length - 1].x && 
		y0 >= table[0].y && y0 <= table[length - 1].y ){
	
		
		dimension.v = 1
		i=0
		if ( typeof(table[i].x) === 'number' && typeof(table[i].y) !== 'number' ){
			dimension.u = length
			dimension.v = 1
			dimension.w = 1
		}
		
		if ( typeof(table[i].x) === 'number' && typeof(table[i].y) === 'number' ){
			for (i = 1; i < length; i++){
				if (table[i].y !== table[i-1].y){ dimension.v++ }
			}	
			dimension.u = length / dimension.v
			dimension.w = 1
		}

	/*	if ( x0 < table[0].x || x0 > table[length -1 ].x ){ 
			console.log('WARNING! x0 out of range', 
			x0 ,
			'not in', 
			table[0].x, 
			table[length -1 ].x,
			'table length:' ,
			length )}
			
		if ( y0 < table[0].y || x0 > table[length -1 ].y ){ 
			//console.log('WARNING! y0 out of range', 
			y0 ,
			'not in', 
			table[0].y, 
			table[length -1 ].y,
			'table length:' ,
			length )}
			*/
		if ( length !== dimension.u * dimension.v){
			console.log('WARNING! Wrong number of elements in matrix. May be not rectangle shaped!')
		}

		i = 0
		while ( table[i].y < y0 ){
			i++
		}
		while ( table[i].x < x0 ){
		i++
		}
		
		m.c3.index = i
		m.c1.index = i - 1
		m.a1.index = m.c1.index - dimension.u
		m.a3.index = m.c3.index - dimension.u

		m.c3.value = table[m.c3.index].val
		m.c1.value = table[m.c1.index].val
		m.a1.value = table[m.a1.index].val
		m.a3.value = table[m.a3.index].val

		m.c3.x = table[m.c3.index].x
		m.c1.x = table[m.c1.index].x
		m.a1.x = table[m.a1.index].x
		m.a3.x = table[m.a3.index].x

		m.c3.y = table[m.c3.index].y
		m.c1.y = table[m.c1.index].y
		m.a1.y = table[m.a1.index].y
		m.a3.y = table[m.a3.index].y


		//interpolate between a1 and a3 new value: a2
		m.a2.value = interpolate(
			m.a1.x, 
			m.a1.value, 
			m.a3.x, 
			m.a3.value, 
			m.b2.x
		)
		m.a2.y = m.a1.y
		//interpolate between c1 and c3 new value: c2
		m.c2.value = interpolate(
			m.c1.x, 
			m.c1.value, 
			m.c3.x, 
			m.c3.value, 
			m.b2.x
		)
		m.c2.y = m.c1.y

		//interpolate between a2 and c2 new value: b2
		m.b2.value = interpolate(
			m.a2.y, 
			m.a2.value, 
			m.c2.y, 
			m.c2.value, 
			m.b2.y
		)

	}

	else {
		m.b2.value='error'
		//console.log('x0 or y0 out of table ' + x0, y0, length)
	}
	return (m.b2.value)
}


function interpolate3D(table, x0, y0, z0){
	//cut table to the values next to z0 and send to 2D interpolate
	
	//interpolate then linear between these two values!!
	var length = Object.keys(table).length

	if (x0 >= table[0].x && x0 <= table[length - 1].x && 
		y0 >= table[0].y && y0 <= table[length - 1].y &&
		z0 >= table[0].z && z0 <= table[length - 1].z ){

		var i, j, z_u, z_l, part_table=[], index
		
		//checking getting upper and lower boundary coordinates!
		i=0
		for (i=0; i < length; i++){
			if ( i >= 1 ){
				if ( z0 > table[ i-1 ].z  && z0 < table[ i ].z ){
					z_u = table[i].z
					z_l = table[i-1].z 
				}
			}
			if ( z0 === 0 ){
				z_u = 1
				z_l = 0
			}
			if ( z0 === table[length - 1].z ){
				z_u = table[length - 1].z
				z_l = table[length - 2].z
			}
		}
		
		
		// making par_table for lower boundary
		j=0
		for (i=0; i < length; i++){
			if ( table[i].z === z_l ){
				part_table[j]={val: table[i].val , x: table[i].x , y:table[i].y}
				j++
			}
		}
		var val_z_l = interpolate2D(part_table, x0, y0)


		// making par_table for upper boundary
		j=0
		for (i=0; i < length; i++){
			if ( table[i].z === z_u ){
				part_table[j]={val: table[i].val , x: table[i].x , y:table[i].y}
				j++
			}
		}
		var val_z_u = interpolate2D(part_table, x0, y0)



		var value = interpolate(
			z_l, 
			val_z_l, 
			z_u, 
			val_z_u, 
			z0
		)
		// console.log( z_l, val_z_l, z_u, val_z_u, z0, value )
	} else {
		value = 'error'
		//console.log('x0 or y0 or z0 out of table ' + x0, y0, z0, length)
	}
	return (value)
}

function bs_1264_calculation(sim){
	
	if ( sim.systemType === 'A' || sim.systemType === 'C' ){


		sim.alpha=10.8
		sim.lambda_u0=1
		sim.s_u0=0.045
		sim.a_T=interpolate1D(britishStandard.tableA1 , sim.R_lambdaB)
		sim.a_u=interpolate2D(britishStandard.tableA2, sim.R_lambdaB, sim.T)
		sim.a_D=interpolate2D(britishStandard.tableA3, sim.R_lambdaB, sim.T)
		sim.B_0=6.7
		sim.a_B=(1 / sim.alpha + sim.s_u0 / sim.lambda_u0) / ( 1/sim.alpha + sim.s_E / sim.lambda_E + sim.R_lambdaB )
		sim.m_T = 1 - sim.T / 0.075
		sim.m_u = 100 * ( 0.045 - sim.s_E )
		sim.m_D = 250 * (stat.userInput.floorHeating1.pipeDiameter - 0.020)
		sim.q=sim.B_0 * sim.a_B * Math.pow(sim.a_T, sim.m_T) * Math.pow(sim.a_u, sim.m_u) * Math.pow(sim.a_D, sim.m_D) * sim.deltaTemp
		sim.floorTemp = Math.pow(sim.q / 8.92, 1/1.11) + stat.userInput.floorHeating1.roomTemp ;
		
		if ( sim.a_T === 'error' || sim.a_u === 'error' || sim.a_D === 'error'  ){ 
			sim.status = 'fail' 
			sim.status2 = sim.a_T  + ' ' + sim.a_u +  ' ' + sim.a_D }
		if ( isNaN(sim.q) ){ sim.status = 'fail' } else {sim.status = 'success'}
	}
	if ( sim.systemType === 'B' ){
		sim.alpha=10.8
		sim.s_u0=0.045
		sim.lambda_u0=1
		// the following must be defined into sim one level up already!!
		//sim.D = stat.userInput.floorHeating1.pipeDiameter
		//sim.s_E = stat.userInput.floorHeating1.s_E
		//sim.lambda_E = stat.userInput.floorHeating1.lambda_E // 1.2
		//sim.s_WL = stat.userInput.floorHeating1.s_WL
		//sim.lambda_WL = stat.userInput.floorHeating1.lambda_WL
		//sim.T=stat.userInput.floorHeating1.pipeDistance
		


		sim.a_u=((1/sim.alpha) + (sim.s_u0/sim.lambda_u0))/( (1/sim.alpha) + (sim.s_E/sim.lambda_E))
		sim.a_T=interpolate1D(britishStandard.tableA1 , sim.R_lambdaB)
		sim.m_T = 1 - sim.T / 0.075
		sim.B_0=6.5
		sim.b_u = interpolate1D(britishStandard.tableA7 , sim.T)			
		sim.K_WL = (sim.s_WL * sim.lambda_WL + sim.b_u * sim.s_E * sim.lambda_E)/0.125

		if ( typeof(sim.K_WL) === 'number' ){
			if ( sim.K_WL <= 1){
				sim.a_WL = interpolate3D(britishStandard.tableA8 , sim.D , sim.T , sim.K_WL)	// --> table A8
			} else {
				sim.a_WL_inf = interpolate3D(britishStandard.tableA8 , sim.D , sim.T , 10000)
				sim.a_WL_null = interpolate3D(britishStandard.tableA8 , sim.D , sim.T , 0 )
				if ( sim.a_WL_inf === 'error' || sim.a_WL_null === 'error' || sim.K_WL === 'error' ){
					sim.a_WL = 'error' 
					} else {
					sim.a_WL = sim.a_WL_inf - ( sim.a_WL_inf - sim.a_WL_null ) * Math.pow( ( (sim.a_WL_inf - 1) / (sim.a_WL_inf - sim.a_WL_null)) , sim.K_WL)
				}
			}
		} else {
			sim.K_WL = 'error'
		}


		sim.a_K = interpolate1D(britishStandard.tableA9 , sim.T)
		sim.a_B=(1 / ( 1 + sim.B_0 * sim.a_u * Math.pow(sim.a_T, sim.m_T) * sim.a_WL * sim.a_K * sim.R_lambdaB * (1 + 0.44 * Math.sqrt(sim.T) )) )
		sim.q=sim.B_0 * sim.a_B * Math.pow(sim.a_T, sim.m_T) * sim.a_u * sim.a_WL * sim.a_K * sim.deltaTemp
		sim.floorTemp = Math.pow(sim.q / 8.92, 1/1.11) + stat.userInput.floorHeating1.roomTemp ;

		if ( sim.a_T === 'error' || sim.a_u === 'error' || sim.a_WL === 'error' || sim.b_u === 'error' ){
			sim.status = 'fail' 
			sim.status2 = sim.a_T  + ' ' + sim.a_u +  ' ' + sim.a_WL +  ' ' +  sim.b_u  }		
			if ( isNaN(sim.q) ){ sim.status = 'fail' } else {sim.status = 'success'}
			
	}
	
	if ( sim.systemType === 'U' ){
		//this is for the underground heat loss
		console.log('add math for heat loss underground!');
		
	}
	//onsole.log(sim)
	return sim
}

export function floorHeatingCalculation(input){
	var sf, counter
	var lookback = []
	var sim = {}
	sim.verboseLevel = input.verboseLevel
	if ( input.verboseLevel > 1 ){
		console.log(input)
	}

	if( typeof(input.scaleFlowRate) === 'number' && typeof(input.scalePipeLength) === 'number' ){
		sim.error = 0
		sim.status = 'success'
		sim.status2 = 'direct calculation'
		sim.flowRate = input.scaleFlowRate
		sim.diameter = stat.userInput.floorHeating3.pipeDiameter
		sim.length = input.scalePipeLength
		sim.deltaTemp = input.deltaTemp
		pressureDrop(sim);		
	}

	if( typeof(input.scalePressureDrop) === 'number' && typeof(input.scalePipeLength) === 'number' ){

		if (input.calcType === 'floorHeating_pressureDrop'){
			//calculate pipeLength based on Pressure Drop
			// keep diameter and vary flowRate to find pressureDrop!!
			sim.verboseLevel = input.verboseLevel
			sim.diameter = stat.userInput.floorHeating3.pipeDiameter
			sim.pressureDrop = input.scalePressureDrop
			sim.flowRate = input.startvalue
//			sim.length = stat.userInput.pipeCalculation.pipeLength
			sim.length = input.scalePipeLength

			sim = pressureDrop(sim);
			
			sim.error = ( sim.pressureDrop - input.scalePressureDrop )/ input.scalePressureDrop
			
			if (sim.error > 0 ){
				sim.sf = input.startvalue * 0.2
				} else { sim.sf = input.startvalue * -0.2 
			}
			sim.counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error > 0 ){
					sim.flowRate = sim.flowRate + sim.sf
					} else {
					sim.flowRate = sim.flowRate - sim.sf
				}
				
				
			sim = pressureDrop(sim);
			sim.error = ( sim.pressureDrop - input.scalePressureDrop )/ input.scalePressureDrop
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sim.sf = sim.sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sim.sf = sim.sf * -0.5
					}

					if ( sim.flowRate <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.status2 = 'flowRate < 0'
						sim.status = 'error'
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.00001 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.status2 = 'minimum error reached!'
						sim.status = 'success'
						sim.cancel = true 
					}

					if ( sim.counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3')
						}
						sim.status2 = 'maximum counter reached'
						sim.status = 'error'
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(sim.counter, sim.sf, sim.error, sim.flowRate, sim.pressureDrop )
				}

				sim.counter++
			}
			//console.log(sim)			
			
			

		}
	}


	if( typeof(input.scaleFloorCoverResistance) === 'number' && typeof(input.scaleMeanTemp) === 'number' ){
		//collect input data for calculation according to BS
		if( input.calcType === 'floorHeating1_Power' ){
			sim.mwt = input.scaleMeanTemp
			sim.R_lambdaB=input.scaleFloorCoverResistance

			sim.systemType=stat.userInput.floorHeating1.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating1.roomTemp
			sim.R_lambdaB = stat.userInput.floorHeating1.R_lambdaB
			sim.D = stat.userInput.floorHeating1.pipeDiameter
			sim.s_E = stat.userInput.floorHeating1.s_E
			sim.lambda_E = stat.userInput.floorHeating1.lambda_E // 1.2
			sim.s_WL = stat.userInput.floorHeating1.s_WL
			sim.lambda_WL = stat.userInput.floorHeating1.lambda_WL

			sim.systemType=stat.userInput.floorHeating1.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating1.roomTemp


			sim.error = 0
			sim = bs_1264_calculation(sim)		
		}
	}

	if( typeof(input.scalePower) === 'number' && typeof(input.scaleMeanTemp) === 'number' ){	
		if( input.calcType === 'floorHeating1_Power' ){
			sim.mwt = input.scaleMeanTemp
			sim.R_lambdaB = input.startvalue



			// variation of sim.R_lambdaB until input.scalePower === sim.q

			sim = bs_1264_calculation(sim)		
			sim.error = ( sim.q - input.scalePower ) / input.scalePower

			// set start direction of search
			if (sim.error > 0 ){
				sf = input.startvalue * 0.2
				} else { sf = input.startvalue * -0.2
			}
			counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error > 0 ){
					sim.R_lambdaB = sim.R_lambdaB + sf
					} else {
					sim.R_lambdaB = sim.R_lambdaB - sf
				}
				
				
				sim = bs_1264_calculation(sim)		
				sim.error = ( sim.q - input.scalePower ) / input.scalePower
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sf = sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sf = sf * -0.5
					}

					if ( sim.R_lambdaB <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.00001 || counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.sma4, sim.q, input.scalePower, sim.R_lambdaB )
				}

				counter++
			}
			//console.log(sim)
		}

		if( input.calcType === 'floorHeating4_Power' ){

			sim.mwt = input.scaleMeanTemp
			sim.T = input.startvalue

			sim.systemType=stat.userInput.floorHeating4.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating4.roomTemp
			sim.R_lambdaB = stat.userInput.floorHeating4.R_lambdaB
			sim.D = stat.userInput.floorHeating4.pipeDiameter
			sim.s_E = stat.userInput.floorHeating4.s_E
			sim.lambda_E = stat.userInput.floorHeating4.lambda_E // 1.2
			sim.s_WL = stat.userInput.floorHeating4.s_WL
			sim.lambda_WL = stat.userInput.floorHeating4.lambda_WL

			
			sim = bs_1264_calculation(sim)		
			sim.error = ( sim.q - input.scalePower ) / input.scalePower

			// set start direction of search
			if (sim.error < 0 ){
				sf = input.startvalue * 0.1
				} else { sf = input.startvalue * -0.1
			}
			counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error > 0 ){
					sim.T = sim.T + sf
					} else {
					sim.T = sim.T - sf
				}
				
				
				sim = bs_1264_calculation(sim)		
				sim.error = ( sim.q - input.scalePower ) / input.scalePower
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sf = sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sf = sf * -0.5
					}

					if ( sim.T <= 0.02 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.cancel = true 
						}
					if ( sim.T >= 0.45 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.0001 || counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 3')
						}
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.q, input.scalePower, sim.T )
				}

				counter++
			}
			//console.log(sim)
		}


	}
	
	if( typeof(input.scaleFloorArea) === 'number' && typeof(input.scalePipeDistance) === 'number' ){
		if( input.calcType === 'floorHeating1_pipeLength' || input.calcType === 'floorHeating1_pipeVolume' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'
			sim.floorArea = input.scaleFloorArea
			sim.pipeDistance = input.scalePipeDistance
			sim.pipeLength = ( 1 / sim.pipeDistance ) * sim.floorArea
			sim.pipeVolume = sim.pipeLength * Math.PI * Math.pow (stat.userInput.floorHeating2.pipeDiameter , 2 ) * 0.25
		}
	}
	
	if( typeof(input.scalePipeLength) === 'number' && typeof(input.scalePipeDistance) === 'number' ){
		if( input.calcType === 'floorHeating1_pipeLength' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'
			sim.pipeLength = input.scalePipeLength
			sim.pipeDistance = input.scalePipeDistance
			sim.floorArea = sim.pipeLength / ( 1 / sim.pipeDistance )
		}
	}	

	if( typeof(input.scalePipeVolume) === 'number' && typeof(input.scalePipeDistance) === 'number' ){
		if( input.calcType === 'floorHeating1_pipeVolume' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation21'
			sim.pipeLength = input.scalePipeVolume / (Math.PI * Math.pow (stat.userInput.floorHeating2.pipeDiameter , 2 ) * 0.25)
			sim.pipeDistance = input.scalePipeDistance
			sim.floorArea = sim.pipeLength / ( 1 / sim.pipeDistance )
		}
	}	

	if( typeof(input.scaleFloorTemp) === 'number' && typeof(input.scaleMeanTemp) === 'number' ){
		if( input.calcType === 'floorHeating1_floorTemp' ){
			sim.mwt = input.scaleMeanTemp
			sim.systemType=stat.userInput.floorHeating1.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating1.roomTemp
			// variation of sim.R_lambdaB until input.scalePower === sim.q

			sim.R_lambdaB = input.startvalue
			sim = bs_1264_calculation(sim)		
			sim.error = ( sim.floorTemp - input.scaleFloorTemp ) / input.scaleFloorTemp

			// set start direction of search
			if (sim.error < 0 ){
				sf = input.startvalue * 0.2
				} else { sf = input.startvalue * -0.2 
			}
			counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error > 0 ){
					sim.R_lambdaB = sim.R_lambdaB + sf
					} else {
					sim.R_lambdaB = sim.R_lambdaB - sf
				}
				
				
				sim = bs_1264_calculation(sim)		
				sim.error = ( sim.floorTemp - input.scaleFloorTemp ) / input.scaleFloorTemp
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sf = sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sf = sf * -0.5
					}

					if ( sim.R_lambdaB <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.00001 || counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.floorTemp, input.scaleFloorTemp, sim.R_lambdaB )
				}

				counter++
			}
			//console.log(sim)
		}
		if( input.calcType === 'floorHeating4_floorTemp' ){
			sim.mwt = input.scaleMeanTemp
			sim.T = input.scalePipeDistance
			sim.systemType=stat.userInput.floorHeating4.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating4.roomTemp
			sim.R_lambdaB = stat.userInput.floorHeating4.R_lambdaB
			sim.D = stat.userInput.floorHeating4.pipeDiameter
			sim.s_E = stat.userInput.floorHeating4.s_E
			sim.lambda_E = stat.userInput.floorHeating4.lambda_E // 1.2
			sim.s_WL = stat.userInput.floorHeating4.s_WL
			sim.lambda_WL = stat.userInput.floorHeating4.lambda_WL


			// variation of sim.T until input.scalePower === sim.q

			sim.T = input.startvalue
			sim = bs_1264_calculation(sim)		
			sim.error = ( sim.floorTemp - input.scaleFloorTemp ) / input.scaleFloorTemp

			// set start direction of search
			if (sim.error < 0 ){
				sf = input.startvalue * 0.2
				} else { sf = input.startvalue * -0.2 
			}
			counter = 0
			lookback = []
			sim.cancel = false
			while ( sim.cancel === false ){
			//		while ( counter  <= 30 ){
				if (sim.error < 0 ){
					sim.T = sim.T + sf
					} else {
					sim.T = sim.T - sf
				}
				
				
				sim = bs_1264_calculation(sim)		
				sim.error = ( sim.floorTemp - input.scaleFloorTemp ) / input.scaleFloorTemp
				
				
				if ( typeof( lookback[2] ) !== 'undefined' ){

					if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
						sf = sf * -1
					}
				
					if ((sim.error >= 0 && lookback[0].error < 0 ) ||
						(sim.error < 0 && lookback[0].error >= 0) ){
						 sf = sf * -0.5
					}

					if ( sim.R_lambdaB <= 0 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1')
						}
						sim.cancel = true 
						}

					if ( Math.abs(sim.error) <= 0.0001 || counter >= 50 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 2')
						}
						sim.cancel = true 
					}
				}
				let simCopy = JSON.parse(JSON.stringify(sim));
				lookback.unshift(simCopy) 			
				if ( sim.verboseLevel > 1 ){
					console.log(counter, sf, sim.error, sim.floorTemp, input.scaleFloorTemp, sim.R_lambdaB )
				}

				counter++
			}
			//console.log(sim)
		}

	}

	if( typeof(input.scalePipeDistance) === 'number' && typeof(input.scaleMeanTemp) === 'number' ){
		//collect input data for calculation according to BS
		if( input.calcType === 'floorHeating4_Power' ){
			sim.mwt = input.scaleMeanTemp
			sim.T = input.scalePipeDistance
			sim.systemType=stat.userInput.floorHeating4.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating1.roomTemp

			sim.R_lambdaB = stat.userInput.floorHeating4.R_lambdaB

			sim.D = stat.userInput.floorHeating4.pipeDiameter
			sim.s_E = stat.userInput.floorHeating4.s_E
			sim.lambda_E = stat.userInput.floorHeating4.lambda_E // 1.2
			sim.s_WL = stat.userInput.floorHeating4.s_WL
			sim.lambda_WL = stat.userInput.floorHeating4.lambda_WL

			sim.error = 0

			sim = bs_1264_calculation(sim)
		}	
		if( input.calcType === 'floorHeating4_floorTemp' ){
			sim.mwt = input.scaleMeanTemp
			sim.T = input.scalePipeDistance
			sim.systemType=stat.userInput.floorHeating4.systemType
			sim.deltaTemp = sim.mwt - stat.userInput.floorHeating4.roomTemp

			sim.R_lambdaB = stat.userInput.floorHeating4.R_lambdaB

			sim.D = stat.userInput.floorHeating4.pipeDiameter
			sim.s_E = stat.userInput.floorHeating4.s_E
			sim.lambda_E = stat.userInput.floorHeating4.lambda_E // 1.2
			sim.s_WL = stat.userInput.floorHeating4.s_WL
			sim.lambda_WL = stat.userInput.floorHeating4.lambda_WL

			sim.error = 0

			sim = bs_1264_calculation(sim)
		}

	}



	return sim
}



export function uValueCalculation(input){
	var sf, counter
	var lookback = []
	var sim = {}
	sim.verboseLevel = input.verboseLevel
	if ( input.verboseLevel > 1 ){
		console.log(input)
	}

	function table321(sim){
			var fp = {
				a1 : -0.0545621 , a2 :  0.3016047 , a3 : -0.575197 ,
				b1 :  0.1436498 , b2 : -0.7512028 , b3 :  1.263755 ,
				c1 : -0.0078826 , c2 :  0.0119111 , c3 :  0.153662 ,
			}
			
			if (stat.userInput.uValue1.ownEquation5 === true ){
				fp = { ...fp, n1 : -0.4993, n2 : 1.5059, n3 : 0.1234 }
			}

			if (stat.userInput.uValue1.ownEquation5 === false ){
				fp = { ...fp, n1 : -0.6, n2 : 1.65, n3 : 0.05 }
			}

			sim.fp = fp

			if (stat.userInput.uValue1.table321 === true ){
				sim.u00 = fp.n1 * Math.pow( sim.relativePerimeter , 2 ) + fp.n2 * sim.relativePerimeter + fp.n3
				sim.m1 = fp.a1 * Math.pow( sim.wallThickness / sim.lambda , 2 ) + fp.a2 * (sim.wallThickness / sim.lambda) + fp.a3 
				sim.m2 = fp.b1 * Math.pow( sim.wallThickness / sim.lambda , 2 ) + fp.b2 * (sim.wallThickness / sim.lambda) + fp.b3
				sim.m3 = fp.c1 * Math.pow( sim.wallThickness / sim.lambda , 2 ) + fp.c2 * (sim.wallThickness / sim.lambda) + fp.c3
				sim.u = sim.m1 * Math.pow( sim.relativePerimeter , 2 ) + sim.m2 * sim.relativePerimeter + sim.m3
			}

			if (stat.userInput.uValue1.table321 === false ){
				sim.u00 = fp.n1 * Math.pow( sim.relativePerimeter , 2 ) + fp.n2 * sim.relativePerimeter + fp.n3
				sim.u =1/( (sim.wallThickness / sim.lambda) + 1/sim.u00)
			}

			return sim
	};

	if( typeof(input.scaleRelativePerimeter) === 'number' && typeof(input.scaleWallThicknes) === 'number' ){
		if( input.calcType === 'uCalculation_floorValue' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'			
			sim.lambda = stat.userInput.uValue1.lambda
			sim.relativePerimeter = input.scaleRelativePerimeter
			sim.wallThickness = input.scaleWallThicknes
			sim = table321(sim);			
		}
		if( input.calcType === 'u00Calculation_floorValue' ){
			sim.error = 0
			sim.status = 'success'
			sim.status2 = 'direct calculation'			
			sim.lambda = stat.userInput.uValue1.lambda
			sim.relativePerimeter = input.scaleRelativePerimeter
			sim.wallThickness = input.scaleWallThicknes
			sim = table321(sim);			
		}
	}	

	if( typeof(input.scaleRelativePerimeter) === 'number' && typeof(input.scaleUValue) === 'number' ){
		if( input.calcType === 'uCalculation_floorValue' ){
			//reverse function with iterative search!!
			//variation of wall thickness error is uValue difference

		sim.relativePerimeter = input.scaleRelativePerimeter
		sim.lambda = stat.userInput.uValue1.lambda
		sim.wallThickness = input.startvalue
		sim = table321(sim)		
		sim.error = ( sim.u - input.scaleUValue ) / input.scaleUValue

		// set start direction of search
		if (sim.error < 0 ){
			sf = input.startvalue * 0.1
			} else { sf = input.startvalue * -0.1
		}
		counter = 0
		lookback = []
		sim.cancel = false
		while ( sim.cancel === false ){
		//		while ( counter  <= 30 ){
			if (sim.error > 0 ){
				sim.wallThickness = sim.wallThickness + sf
				} else {
				sim.wallThickness = sim.wallThickness - sf
			}
			
			
			sim = table321(sim)		
			sim.error = ( sim.u - input.scaleUValue ) / input.scaleUValue
			
			
			if ( typeof( lookback[2] ) !== 'undefined' ){

				if ( Math.abs(sim.error) > Math.abs(lookback[0].error) ) {
					sf = sf * -1
				}
			
				if ((sim.error >= 0 && lookback[0].error < 0 ) ||
					(sim.error < 0 && lookback[0].error >= 0) ){
					 sf = sf * -0.5
				}

				if ( sim.wallThickness < 0 ){
					if ( sim.verboseLevel > 1 ){
						console.log('cond 1')
					}
					sim.status = 'failed'
					sim.status2 = 'wall insulation thickness < 0'
					sim.cancel = true 
					}

				if(stat.userInput.uValue1.table321 === true){
					if ( sim.wallThickness > 0.1 ){
						if ( sim.verboseLevel > 1 ){
							console.log('cond 1b')
						}
						sim.status = 'failed'
						sim.status2 = 'wall insulation thickness > 0.1'
						sim.cancel = true 
					}
				}

				if ( sim.relativePerimeter < 0.1 ){
					if ( sim.verboseLevel > 1 ){
						console.log('cond 1c')
					}
					sim.status = 'failed'
					sim.status2 = 'wall insulation thickness > 0.1'
					sim.cancel = true 
					}

				if ( sim.relativePerimeter > 1 ){
					if ( sim.verboseLevel > 1 ){
						console.log('cond 1d')
					}
					sim.status = 'failed'
					sim.status2 = 'wall insulation thickness > 0.1'
					sim.cancel = true 
					}

				if ( counter >= 50 ){
					if ( sim.verboseLevel > 1 ){
						console.log('cond 2')
					}
					sim.status = 'failed'
					sim.status2 = 'counter > 50'
					sim.cancel = true 
				}

				if ( Math.abs(sim.error) <= 0.00001 ){
					if ( sim.verboseLevel > 1 ){
						console.log('cond 3')
					}
					sim.status = 'success'
					sim.status2 = 'minimum error reached'	
					sim.cancel = true 
				}

			}
			let simCopy = JSON.parse(JSON.stringify(sim));
			lookback.unshift(simCopy) 			
			if ( sim.verboseLevel > 1 ){
				console.log(counter, sf, sim.error, sim.wallThickness, sim.u, input.scaleUValue )
			}

			counter++
		}
		//console.log(sim)			
			
			
		}
	}	

	return sim
}


