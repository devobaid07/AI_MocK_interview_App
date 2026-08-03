        setCurrentUser(JSON.parse(saved));
      } catch {
        // Invalid data, clear it
        localStorage.removeItem('prepai_current_user');
      }
    }
    setIsCheckingAuth(false);
  }, []);
  const handleLogin = (user: UserData) => {
    setCurrentUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem('prepai_current_user');
    setCurrentUser(null);
  };
  // Don't flash UI while checking auth
  if (isCheckingAuth) {
    return (
      <div style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        minHeight: '100vh', background: 'var(--bg-darker)' 
      }}>
        <div className="auth-spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }}></div>
      </div>
    );
  }
  // Not logged in: show auth screen
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }
  // Logged in: show the main app
  return (
    <InterviewProvider>
      <AppContent user={currentUser} onLogout={handleLogout} />
    </InterviewProvider>
  );
}
export default App
export default App;
