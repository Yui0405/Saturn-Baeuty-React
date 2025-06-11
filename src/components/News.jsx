import React from "react";
import { Box, Typography } from "@mui/material";

const Noticias = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "var(--color-secondary)",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Playfair Display",
            color: "var(--color-primary)",
            mb: 4,
          }}
          gutterBottom
        >
          Noticias
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              textAlign: "justify",
              color: "text.primary", 
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mb: "20px",
                display: "block",
                justifyContent: "start",
                width: "100%",
                fontFamily: "Playfair Display",
                color: "var(--color-primary)",
              }}
            >
              Soft Pinch Liquid Blush: El Rubor Líquido que Revoluciona el
              Maquillaje
            </Typography>

            <Typography
              sx={{
                fontFamily: "Playfair Display",
                color: "var(--color-primary)",
                textAlign: "justify",
              }}
              variant="body2"
            >
              Rare Beauty, la marca de maquillaje creada por Selena Gomez, sigue
              conquistando el mundo de la belleza con productos innovadores y de
              alta calidad. Uno de sus bestsellers indiscutibles es el Soft
              Pinch Liquid Blush, un rubor líquido que ha causado sensación en
              redes sociales y se ha convertido en un imprescindible para los
              amantes del maquillaje. Este rubor destaca por su fórmula ligera y
              altamente pigmentada, que permite lograr un acabado natural con
              solo una gota de producto. Disponible en una amplia gama de tonos
              con acabados mate y húmedo, el Soft Pinch Liquid Blush se adapta a
              todos los tipos de piel y estilos de maquillaje. Además, su
              composición incluye ingredientes botánicos como loto, gardenia y
              nenúfar blanco, que ayudan a calmar y nutrir la piel,
              convirtiéndolo en una opción ideal para quienes buscan un
              maquillaje que no solo embellezca, sino que también cuide la piel.
              Con su éxito viral en plataformas como TikTok, este rubor líquido
              ha demostrado ser un producto revolucionario que redefine la forma
              en que aplicamos el color en nuestras mejillas. Si aún no lo has
              probado, ¡es el momento de sumarlo a tu colección!
            </Typography>
          </Box>

          <Box
            sx={{
              ml: "100px",
              width: "200px",
              height: "300px",
              backgroundImage: "url(/images/noticias.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Noticias;
