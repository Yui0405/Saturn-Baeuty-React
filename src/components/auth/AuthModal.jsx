import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Modal, 
  Box, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Typography, 
  Divider,
  IconButton,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { Close as CloseIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: 1,
  '& .MuiTextField-root': {
    '& .MuiInputBase-input': {
      color: '#000000',
    },
    '& .MuiInputLabel-root': {
      color: '#6F0936',
      '&.Mui-focused': {
        color: '#6F0936',
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#6F0936',
      },
      '&:hover fieldset': {
        borderColor: '#6F0936',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F0936',
      },
    },
  },
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    )
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
});

const AuthModal = () => {
  const { authModal, closeAuthModal, login } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(tabValue === 0 ? loginSchema : registerSchema),
    mode: 'onBlur'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    reset(); 
    setServerError('');
  };

  const onSubmit = async (data) => {
    try {
      setServerError('');
      
      if (tabValue === 0) {
        console.log('Iniciando sesión con:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        login({ email: data.email, name: data.name || 'Usuario' });
        closeAuthModal();
      } else {
        console.log('Registrando usuario:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        setTabValue(0);
        alert('¡Registro exitoso! Por favor inicia sesión.');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError(
        error.response?.data?.message || 
        'Ocurrió un error. Por favor, inténtalo de nuevo.'
      );
    }
  };

  return (
    <Modal
      open={authModal.open}
      onClose={closeAuthModal}
      aria-labelledby="auth-modal-title"
    >
      <Box sx={style}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.01)'
          }
        }}>
          <Typography variant="h5" id="auth-modal-title">
            {tabValue === 0 ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Typography>
          <IconButton 
            onClick={closeAuthModal} 
            size="small"
            sx={{
              color: '#6F0936',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#6F0936',
                color: 'white',
                '& svg': {
                  color: 'white',
                  transform: 'scale(1.1)'
                }
              },
              '& svg': {
                transition: 'all 0.2s ease-in-out',
                fontSize: '1.25rem'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ 
            mb: 2,
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
              height: 0
            },
            '& .MuiTab-root': {
              color: '#6F0936',
              fontWeight: 400,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              minHeight: 48,
              borderRadius: 0,
              padding: '6px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#6F0936',
                color: 'white',
                transform: 'scale(1.05)',
                opacity: 1,
              },
              '&.Mui-selected': {
                color: '#6F0936',
                fontWeight: 600,
                opacity: 1,
                borderBottom: '2px solid #6F0936',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#6F0936',
                  transform: 'none',
                }
              },
              '&.Mui-focusVisible': {
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <Tab 
            label="Iniciar Sesión" 
            disableRipple
          />
          <Tab 
            label="Crear Cuenta" 
            disableRipple
          />
        </Tabs>

        {/* Mostrar errores del servidor */}
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TabPanel value={tabValue} index={0}>
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                      sx={{
                        color: '#6F0936',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        },
                        '& svg': {
                          fontSize: '1.25rem',
                          color: '#6F0936'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              disabled={isSubmitting}
              sx={{ mt: 2, py: 1.5 }}
            >
              {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField
              fullWidth
              label="Nombre completo"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
            />
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message || 'Mínimo 6 caracteres, con mayúscula, minúscula y número'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                      sx={{
                        color: '#6F0936',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        },
                        '& svg': {
                          fontSize: '1.25rem',
                          color: '#6F0936'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      tabIndex={-1}
                      sx={{
                        color: '#6F0936',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        },
                        '& svg': {
                          fontSize: '1.25rem',
                          color: '#6F0936'
                        }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('confirmPassword')}
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit"
              disabled={isSubmitting}
              sx={{ mt: 2, py: 1.5 }}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </Button>
          </TabPanel>
        </form>
        
        <Divider sx={{ my: 3 }}>o</Divider>
        
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.939-1.746-4.574-2.797-6.735-2.797-5.526 0-10 4.474-10 10s4.474 10 10 10c8.396 0 10-7.85 8.387-11.746l-8.387-0.013z" />
            </svg>
          }
          sx={{
            mb: 2,
            borderRadius: 0,
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#6F0936',
              color: 'white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              '& .MuiButton-startIcon': {
                '& svg': {
                  color: 'white' 
                }
              }
            },
            '& .MuiButton-startIcon': {
              marginRight: 1,
              transition: 'color 0.3s ease',
              '& svg': {
                color: '#DB4437', 
                transition: 'color 0.3s ease'
              }
            }
          }}
        >
          Continuar con Google
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
