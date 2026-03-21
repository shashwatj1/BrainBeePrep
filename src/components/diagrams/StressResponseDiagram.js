import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Line,
  Text as SvgText,
  Polygon,
} from 'react-native-svg';

export const STRESS_PARTS = [
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    description:
      'Brain region that initiates the stress response by releasing CRH (corticotropin-releasing hormone)',
  },
  {
    id: 'crh',
    name: 'CRH',
    description:
      'Corticotropin-releasing hormone; travels from hypothalamus to pituitary via the portal system',
  },
  {
    id: 'pituitary',
    name: 'Pituitary Gland',
    description:
      'Master endocrine gland; anterior pituitary releases ACTH in response to CRH',
  },
  {
    id: 'acth',
    name: 'ACTH',
    description:
      'Adrenocorticotropic hormone; travels through blood to stimulate the adrenal cortex',
  },
  {
    id: 'adrenal_glands',
    name: 'Adrenal Glands',
    description:
      'Sit atop the kidneys; cortex releases cortisol, medulla releases epinephrine and norepinephrine',
  },
  {
    id: 'cortisol',
    name: 'Cortisol',
    description:
      'Primary stress hormone; increases blood sugar, suppresses immune system, aids metabolism',
  },
  {
    id: 'negative_feedback',
    name: 'Negative Feedback',
    description:
      'Cortisol feeds back to inhibit hypothalamus and pituitary, shutting down the stress response',
  },
  {
    id: 'stress_trigger',
    name: 'Stress Trigger',
    description:
      'Physical or psychological stressor detected by the amygdala, which activates the hypothalamus',
  },
];

const COLORS = {
  brain: '#4C6EF5',
  hypothalamus: '#4C6EF5',
  pituitary: '#A78BFA',
  adrenal: '#FB923C',
  crh: '#22D3EE',
  acth: '#4ADE80',
  cortisol: '#F87171',
  stressTrigger: '#FBBF24',
  kidney: '#64748B',
  label: '#FFFFFF',
  labelLine: '#64748B',
};

const StressResponseDiagram = ({
  width = 350,
  height = 380,
  showLabels = true,
  highlightedParts = [],
  onPartPress,
}) => {
  const isHighlighted = (partId) => highlightedParts.includes(partId);

  const getOpacity = (partId) => {
    if (highlightedParts.length === 0) return 1;
    return isHighlighted(partId) ? 1 : 0.35;
  };

  const handlePress = (partId) => {
    if (onPartPress) {
      onPartPress(partId);
    }
  };

  // Scale factors based on default 350x380
  const sx = width / 350;
  const sy = height / 380;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 350 380">
        {/* ===== STRESS TRIGGER ARROW ===== */}
        <G opacity={getOpacity('stress_trigger')}>
          <TouchableOpacity onPress={() => handlePress('stress_trigger')}>
            <G>
              {/* Arrow shaft */}
              <Line
                x1="175"
                y1="2"
                x2="175"
                y2="30"
                stroke={COLORS.stressTrigger}
                strokeWidth="2.5"
              />
              {/* Arrow head */}
              <Polygon
                points="175,38 169,28 181,28"
                fill={COLORS.stressTrigger}
              />
              {/* Zigzag stress symbol */}
              <Path
                d="M155,6 L160,2 L165,10 L170,2 L175,10 L180,2 L185,10 L190,2 L195,6"
                stroke={COLORS.stressTrigger}
                strokeWidth="1.5"
                fill="none"
              />
              {showLabels && (
                <>
                  <Line
                    x1="195"
                    y1="5"
                    x2="225"
                    y2="5"
                    stroke={COLORS.labelLine}
                    strokeWidth="0.8"
                  />
                  <SvgText
                    x="228"
                    y="8"
                    fill={COLORS.stressTrigger}
                    fontSize="8"
                    fontWeight="bold"
                  >
                    Stress Trigger
                  </SvgText>
                </>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== BRAIN OUTLINE ===== */}
        <G opacity={getOpacity('hypothalamus')}>
          <TouchableOpacity onPress={() => handlePress('hypothalamus')}>
            <G>
              {/* Brain outer shape */}
              <Path
                d="M110,75 C110,42 135,32 155,35 C165,28 185,28 195,35 C215,32 240,42 240,75 C240,95 230,108 218,112 C210,118 195,120 175,120 C155,120 140,118 132,112 C120,108 110,95 110,75 Z"
                fill={COLORS.brain}
                fillOpacity={0.15}
                stroke={COLORS.brain}
                strokeWidth="1.5"
              />
              {/* Brain midline */}
              <Line
                x1="175"
                y1="35"
                x2="175"
                y2="105"
                stroke={COLORS.brain}
                strokeWidth="0.7"
                strokeDasharray="3,2"
                opacity={0.5}
              />
              {/* Brain folds left */}
              <Path
                d="M125,60 C135,55 145,58 155,55"
                stroke={COLORS.brain}
                strokeWidth="0.7"
                fill="none"
                opacity={0.4}
              />
              <Path
                d="M120,78 C130,73 145,76 160,73"
                stroke={COLORS.brain}
                strokeWidth="0.7"
                fill="none"
                opacity={0.4}
              />
              {/* Brain folds right */}
              <Path
                d="M195,55 C205,58 215,55 225,60"
                stroke={COLORS.brain}
                strokeWidth="0.7"
                fill="none"
                opacity={0.4}
              />
              <Path
                d="M190,73 C205,76 220,73 230,78"
                stroke={COLORS.brain}
                strokeWidth="0.7"
                fill="none"
                opacity={0.4}
              />

              {/* Hypothalamus region */}
              <Ellipse
                cx="175"
                cy="100"
                rx="22"
                ry="12"
                fill={COLORS.hypothalamus}
                fillOpacity={0.5}
                stroke={COLORS.hypothalamus}
                strokeWidth="1.5"
              />
              {showLabels && (
                <>
                  <Line
                    x1="153"
                    y1="100"
                    x2="70"
                    y2="85"
                    stroke={COLORS.labelLine}
                    strokeWidth="0.8"
                  />
                  <Circle cx="70" cy="85" r="1.5" fill={COLORS.labelLine} />
                  <SvgText
                    x="10"
                    y="82"
                    fill={COLORS.label}
                    fontSize="7.5"
                    fontWeight="bold"
                  >
                    Hypothalamus
                  </SvgText>
                  <SvgText
                    x="10"
                    y="92"
                    fill={COLORS.label}
                    fontSize="6"
                    opacity={0.7}
                  >
                    Releases CRH
                  </SvgText>
                </>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== CRH ARROW ===== */}
        <G opacity={getOpacity('crh')}>
          <TouchableOpacity onPress={() => handlePress('crh')}>
            <G>
              <Line
                x1="175"
                y1="115"
                x2="175"
                y2="148"
                stroke={COLORS.crh}
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />
              <Polygon
                points="175,155 169,145 181,145"
                fill={COLORS.crh}
              />
              {showLabels && (
                <SvgText
                  x="185"
                  y="138"
                  fill={COLORS.crh}
                  fontSize="8"
                  fontWeight="bold"
                >
                  CRH
                </SvgText>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== PITUITARY GLAND ===== */}
        <G opacity={getOpacity('pituitary')}>
          <TouchableOpacity onPress={() => handlePress('pituitary')}>
            <G>
              {/* Pituitary stalk */}
              <Rect
                x="171"
                y="120"
                width="8"
                height="12"
                fill={COLORS.pituitary}
                fillOpacity={0.3}
                rx="2"
              />
              {/* Pituitary gland body */}
              <Ellipse
                cx="175"
                cy="168"
                rx="18"
                ry="10"
                fill={COLORS.pituitary}
                fillOpacity={0.35}
                stroke={COLORS.pituitary}
                strokeWidth="1.5"
              />
              {/* Anterior/posterior division */}
              <Line
                x1="175"
                y1="158"
                x2="175"
                y2="178"
                stroke={COLORS.pituitary}
                strokeWidth="0.5"
                strokeDasharray="2,1"
                opacity={0.5}
              />
              {showLabels && (
                <>
                  <Line
                    x1="193"
                    y1="168"
                    x2="260"
                    y2="162"
                    stroke={COLORS.labelLine}
                    strokeWidth="0.8"
                  />
                  <Circle cx="260" cy="162" r="1.5" fill={COLORS.labelLine} />
                  <SvgText
                    x="265"
                    y="159"
                    fill={COLORS.label}
                    fontSize="7.5"
                    fontWeight="bold"
                  >
                    Pituitary
                  </SvgText>
                  <SvgText
                    x="265"
                    y="169"
                    fill={COLORS.label}
                    fontSize="6"
                    opacity={0.7}
                  >
                    Releases ACTH
                  </SvgText>
                </>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== ACTH ARROW ===== */}
        <G opacity={getOpacity('acth')}>
          <TouchableOpacity onPress={() => handlePress('acth')}>
            <G>
              <Line
                x1="175"
                y1="180"
                x2="175"
                y2="220"
                stroke={COLORS.acth}
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />
              <Polygon
                points="175,227 169,217 181,217"
                fill={COLORS.acth}
              />
              {showLabels && (
                <SvgText
                  x="185"
                  y="205"
                  fill={COLORS.acth}
                  fontSize="8"
                  fontWeight="bold"
                >
                  ACTH
                </SvgText>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== KIDNEYS ===== */}
        <G opacity={getOpacity('adrenal_glands')}>
          {/* Left kidney */}
          <Path
            d="M120,268 C108,260 105,240 110,228 C115,218 125,218 130,228 C135,240 132,260 120,268 Z"
            fill={COLORS.kidney}
            fillOpacity={0.25}
            stroke={COLORS.kidney}
            strokeWidth="1"
          />
          {/* Right kidney */}
          <Path
            d="M230,268 C218,260 215,240 220,228 C225,218 235,218 240,228 C245,240 242,260 230,268 Z"
            fill={COLORS.kidney}
            fillOpacity={0.25}
            stroke={COLORS.kidney}
            strokeWidth="1"
          />
        </G>

        {/* ===== ADRENAL GLANDS ===== */}
        <G opacity={getOpacity('adrenal_glands')}>
          <TouchableOpacity onPress={() => handlePress('adrenal_glands')}>
            <G>
              {/* Left adrenal */}
              <Path
                d="M108,228 C112,220 118,218 124,220 C128,222 130,226 128,228"
                fill={COLORS.adrenal}
                fillOpacity={0.5}
                stroke={COLORS.adrenal}
                strokeWidth="1.5"
              />
              {/* Right adrenal */}
              <Path
                d="M222,228 C226,220 232,218 238,220 C242,222 244,226 242,228"
                fill={COLORS.adrenal}
                fillOpacity={0.5}
                stroke={COLORS.adrenal}
                strokeWidth="1.5"
              />
              {showLabels && (
                <>
                  <Line
                    x1="244"
                    y1="224"
                    x2="272"
                    y2="230"
                    stroke={COLORS.labelLine}
                    strokeWidth="0.8"
                  />
                  <Circle cx="272" cy="230" r="1.5" fill={COLORS.labelLine} />
                  <SvgText
                    x="277"
                    y="227"
                    fill={COLORS.label}
                    fontSize="7.5"
                    fontWeight="bold"
                  >
                    Adrenal
                  </SvgText>
                  <SvgText
                    x="277"
                    y="237"
                    fill={COLORS.label}
                    fontSize="7.5"
                    fontWeight="bold"
                  >
                    Glands
                  </SvgText>
                  <SvgText
                    x="277"
                    y="247"
                    fill={COLORS.label}
                    fontSize="6"
                    opacity={0.7}
                  >
                    Release Cortisol
                  </SvgText>
                  {/* Kidney label */}
                  <Line
                    x1="108"
                    y1="250"
                    x2="72"
                    y2="255"
                    stroke={COLORS.labelLine}
                    strokeWidth="0.8"
                  />
                  <Circle cx="72" cy="255" r="1.5" fill={COLORS.labelLine} />
                  <SvgText
                    x="30"
                    y="258"
                    fill={COLORS.kidney}
                    fontSize="7"
                  >
                    Kidneys
                  </SvgText>
                </>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== CORTISOL ARROW (downward release) ===== */}
        <G opacity={getOpacity('cortisol')}>
          <TouchableOpacity onPress={() => handlePress('cortisol')}>
            <G>
              {/* Short arrow down from adrenals */}
              <Line
                x1="175"
                y1="232"
                x2="175"
                y2="260"
                stroke={COLORS.cortisol}
                strokeWidth="2"
                strokeDasharray="3,2"
              />
              <Polygon
                points="175,267 170,258 180,258"
                fill={COLORS.cortisol}
              />
              {showLabels && (
                <SvgText
                  x="185"
                  y="252"
                  fill={COLORS.cortisol}
                  fontSize="7.5"
                  fontWeight="bold"
                >
                  Cortisol
                </SvgText>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== NEGATIVE FEEDBACK LOOP ===== */}
        <G opacity={getOpacity('negative_feedback')}>
          <TouchableOpacity onPress={() => handlePress('negative_feedback')}>
            <G>
              {/* Curved feedback arrow from adrenals back up to hypothalamus */}
              <Path
                d="M108,225 C60,220 40,170 42,130 C44,100 55,80 80,72"
                stroke={COLORS.cortisol}
                strokeWidth="1.8"
                strokeDasharray="5,3"
                fill="none"
              />
              {/* Arrowhead at top of feedback */}
              <Polygon
                points="82,68 74,73 78,78"
                fill={COLORS.cortisol}
              />
              {/* Inhibition symbol at hypothalamus */}
              <Line
                x1="88"
                y1="73"
                x2="98"
                y2="73"
                stroke={COLORS.cortisol}
                strokeWidth="2"
              />
              {showLabels && (
                <>
                  <SvgText
                    x="8"
                    y="150"
                    fill={COLORS.cortisol}
                    fontSize="6.5"
                    fontWeight="bold"
                    transform="rotate(-90, 14, 155)"
                  >
                    Negative Feedback
                  </SvgText>
                  <SvgText
                    x="18"
                    y="167"
                    fill={COLORS.cortisol}
                    fontSize="5.5"
                    opacity={0.7}
                    transform="rotate(-90, 24, 167)"
                  >
                    (Cortisol inhibits)
                  </SvgText>
                </>
              )}
            </G>
          </TouchableOpacity>
        </G>

        {/* ===== BODY EFFECTS BOX ===== */}
        <G opacity={getOpacity('cortisol')}>
          <Rect
            x="85"
            y="278"
            width="180"
            height="55"
            rx="6"
            fill="#1E293B"
            stroke={COLORS.cortisol}
            strokeWidth="1"
            fillOpacity={0.8}
          />
          <SvgText
            x="175"
            y="293"
            fill={COLORS.cortisol}
            fontSize="7.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            Body Effects
          </SvgText>
          <Line
            x1="105"
            y1="297"
            x2="245"
            y2="297"
            stroke={COLORS.cortisol}
            strokeWidth="0.5"
            opacity={0.4}
          />
          <SvgText
            x="175"
            y="309"
            fill={COLORS.label}
            fontSize="6.5"
            textAnchor="middle"
            opacity={0.85}
          >
            {'\u2022'} Increased heart rate
          </SvgText>
          <SvgText
            x="175"
            y="320"
            fill={COLORS.label}
            fontSize="6.5"
            textAnchor="middle"
            opacity={0.85}
          >
            {'\u2022'} Suppressed immune system
          </SvgText>
          <SvgText
            x="175"
            y="331"
            fill={COLORS.label}
            fontSize="6.5"
            textAnchor="middle"
            opacity={0.85}
          >
            {'\u2022'} Elevated blood sugar
          </SvgText>
        </G>

        {/* ===== TITLE ===== */}
        {showLabels && (
          <SvgText
            x="175"
            y="370"
            fill={COLORS.label}
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            opacity={0.6}
          >
            HPA Axis Stress Response
          </SvgText>
        )}
      </Svg>
    </View>
  );
};

export default StressResponseDiagram;
